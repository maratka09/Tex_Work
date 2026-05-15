from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="",
)

class ChatView(APIView):
    def post(self, request):
        user_text = request.data.get('text')
        try:
            completion = client.chat.completions.create(
                model="inclusionai/ring-2.6-1t:free",
                messages=[{"role": "user", "content": user_text}]
            )
            return Response({"reply": completion.choices[0].message.content})
        except Exception as e:
            return Response({"error": str(e)}, status=500)