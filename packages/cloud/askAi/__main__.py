import json
import os

from openai import OpenAI

agent_endpoint = os.environ.get("AGENT_ENDPOINT") + "/api/v1/" 
agent_access_key = os.environ.get("AGENT_ACCESS_KEY")

def main(args):
    input_value = args.get("input_value")
    
    if not input_value:
        return {
            "ok": False,
            "error": "Please provide a valid input"
        }
    
    try:
        client = OpenAI(
            base_url = agent_endpoint,
            api_key = agent_access_key,
        )
        
        response = client.chat.completions.create(
            model = "n/a",
            messages = [{"role": "user", "content": input_value}],
            extra_body = {"include_retrieval_info": True}
        )

        response_content = ""
        for choice in response.choices:
            response_content += choice.message.content
        
        # response_dict = response.to_dict()

        return {
            "ok": True,
            "content": response_content,
            # "retrieval": response_dict.get("retrieval", {}),
            # "full_response": response_dict
        }
    
    except Exception as e:
        return {
            "ok": False,
            "error": str(e),
            "error_type": type(e).__name__
        }