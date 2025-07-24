import json
import os

from openai import OpenAI

agent_endpoint = os.environ.get("AGENT_ENDPOINT") + "/api/v1/" 
agent_access_key = os.environ.get("AGENT_ACCESS_KEY")

def main(args):
    input_value: str = args.get("inputValue")
    chat_history = args.get("chatHistory", [])
    
    if not input_value.strip():
        return {
            "body": {
                "ok": False,
                "error": "Please provide a valid input",
            },
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json"
            }
        }
    
    try:
        client = OpenAI(
            base_url = agent_endpoint,
            api_key = agent_access_key,
        )
        
        messages = []
        for chat in chat_history[:-1]:  # Exclude the last message (current input)
            role = "user" if chat.get("isUser") else "assistant"
            messages.append({"role": role, "content": chat.get("text", "")})
        
        # Add the current message
        messages.append({"role": "user", "content": input_value})
        
        response = client.chat.completions.create(
            model = "n/a",
            messages = messages,
            extra_body = {"include_retrieval_info": True}
        )

        response_content = ""
        for choice in response.choices:
            response_content += choice.message.content
        
        # response_dict = response.to_dict()
        
        return {
            "body": {
                "ok": True,
                "content": response_content,
                # "retrieval": response_dict.get("retrieval", {}),
                # "full_response": response_dict
            },
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            }
	    }
    
    except Exception as e:
        return {
            "body": {
                "ok": False,
                "error": str(e),
            },
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json"
            }
        }
        