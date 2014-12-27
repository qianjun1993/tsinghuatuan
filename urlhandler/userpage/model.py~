from django.http import HttpResponse, Http404
from django.template import RequestContext
from django.shortcuts import render_to_response
from urlhandler.models import User, Activity, Ticket,Map,Comment, Item,Exchange
from urlhandler.settings import STATIC_URL
import urllib, urllib2,json
import datetime
from django.utils import timezone
from django.forms.models import model_to_dict

def getuserbyopenid(openid):
    currentUser = User.objects.filter(weixin_id=openid)
    return currentUser

def getlastcomment(use_id):
    currentcomment = Comment.objects.filter(stu_id=use_id)
    return currentcomment[currentcomment.count()-1]

def addfeedback(use_id,feedback_text,feedback_type):
    newfeedback = Comment.objects.create(stu_id=use_id,description=feedback_text,ctype=feedback_type,checktype=0,time=datetime.datetime.now())
    print 1
    change_user_points(use_id, 1)
    print 1
    newfeedback.save()

def change_user_points(use_id, number):
    users = User.objects.filter(stu_id=use_id)
    user = users[0]
    user.points = user.points+number
    user.save()
           

def wrap_item_dict(activity):
    dt = model_to_dict(activity)
    return dt

def getallItem():
    itemmodels = Item.objects.order_by('-points').all()
    items = []
    for item in itemmodels:
        items += [wrap_item_dict(item)]
    return items

def getmyItem(weixin_id):
    users = User.objects.filter(weixin_id = weixin_id,status=1)
    user = users[0]
    print user.stu_id
    exchangemodels = Exchange.objects.filter(stu_id=user.stu_id,etype=0)
    items = []
    for exchange in exchangemodels:
        print exchange.Item
        items += [wrap_item_dict(exchange.Item)]
    return items

def check_point(weixin_id):
    users = User.objects.filter(weixin_id = weixin_id,status=1)
    if users.exists():
        user = users[0]
        point = user.points
        return point
    return 0

def addexchange(weixin_id,itemid):
    users = User.objects.filter(weixin_id = weixin_id,status=1)
    user = users[0]
    items = Item.objects.filter(id = itemid)
    item= items[0]
    item.remain_number=item.remain_number-1
    user.points=user.points-item.points
    item.save()
    user.save()
    Exchange.objects.create(
        stu_id=user.stu_id,
        Item=item,
        etype=0)
