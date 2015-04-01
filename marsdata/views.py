import json
import requests

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods


# Create your views here.

@require_http_methods(['GET'])
def home(request):
	return render(request, "marsdata.html")

@require_http_methods(['GET'])
def datahandler(request):
	
	url = "http://marsweather.ingenology.com/v1/archive/?format=json&terrestrial_date_start=" + request.GET['start_date'] + "&terrestrial_date_end=" + request.GET['end_date']
	resp = requests.get(url).json()
	results = []
	results = resp['results']

	while resp['next'] != None:
		resp = requests.get(resp['next']).json()		
		for point in resp['results']:
			results.append(point)

	return HttpResponse(json.dumps(results), content_type="application/json")
	
@require_http_methods(['GET'])
def about(request):
	return render(request, "about.html")