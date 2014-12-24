from django.http import HttpResponse, Http404
from django.template import RequestContext
from django.shortcuts import render_to_response
from urlhandler.models import User, Activity, Ticket,Map,Comment
from urlhandler.settings import STATIC_URL
import urllib, urllib2,json
import datetime
from django.utils import timezone

def getuserbyopenid(openid):
    currentUser = User.objects.filter(weixin_id=openid)
    return currentUser

def getlastcomment(use_id):
    currentcomment = Comment.objects.filter(stu_id=use_id)
    return currentcomment[currentcomment.count()-1]

def addfeedback(use_id,feedback_text,feedback_type):
    newfeedback = Comment.objects.create(stu_id=use_id,description=feedback_text,ctype=feedback_type,checktype=0,time=datetime.datetime.now())
    print 1
    newfeedback.save()
