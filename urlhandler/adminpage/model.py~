from django.http import HttpResponse, Http404
from django.template import RequestContext
from django.forms.models import model_to_dict
from datetime import datetime
import json
import time
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib import auth
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.db.models import F
import urllib
import urllib2
from urlhandler.models import Activity, Ticket,User,Activity, Ticket,Comment
from urlhandler.models import User as Booker
from weixinlib.custom_menu import get_custom_menu, modify_custom_menu, add_new_custom_menu, auto_clear_old_menus
from weixinlib.settings import get_custom_menu_with_book_acts, WEIXIN_BOOK_HEADER
from adminpage.safe_reverse import *

import xlwt
import re
from django.utils.http import urlquote
from django.utils.encoding import smart_str

def checktype_str_to_int(str):
    if str == "none":
        return -1
    if str == "not_read":
        return 0
    if str == "already_ignore":
        return 1
    if str == "already_pass":
        return 2
    if str == "already_punish":
        return 3
    return -1

def ctype_str_to_int(str):
    if str == "none":
        return -1
    if str == "bug_feedback":
        return 0
    if str == "function_advice":
        return 1
    if str == "activity_feedback":
        return 2
    return -1

def str_to_datetime(mystr):
    return datetime.strptime(mystr,'%Y-%m-%d %H:%M:%S')

def find_feedback_models(checktype_str, feedback_start_time, feedback_end_time, ctype_str):
    checktype = checktype_str_to_int(checktype_str)
    ctype = ctype_str_to_int(ctype_str)
    if checktype == -1:
        if ctype == -1:
            if feedback_start_time == "none":
                if feedback_end_time == "none":
                    feedbackmodels = Comment.objects.filter()
                else:
                    feedbackmodels = Comment.objects.filter(time__lt=str_to_datetime(feedback_end_time))
            else:
                if feedback_end_time == "none":
                    print str_to_datetime(feedback_start_time)
                    feedbackmodels = Comment.objects.filter(time__gt=str_to_datetime(feedback_start_time))
                else:
                    feedbackmodels = Comment.objects.filter(time__gt=str_to_datetime(feedback_start_time), time__lt=str_to_datetime(feedback_end_time))
        else:
            if feedback_start_time == "none":
                if feedback_end_time == "none":
                    feedbackmodels = Comment.objects.filter(ctype=ctype)
                else:
                    feedbackmodels = Comment.objects.filter(ctype=ctype, time__lt=str_to_datetime(feedback_end_time))
            else:
                if feedback_end_time == "none":
                    feedbackmodels = Comment.objects.filter(ctype=ctype, time__gt=str_to_datetime(feedback_start_time))
                else:
                    feedbackmodels = Comment.objects.filter(ctype=ctype, time__gt=str_to_datetime(feedback_start_time), time__lt=str_to_datetime(feedback_end_time))
    else:
        if ctype == -1:
            if feedback_start_time == "none":
                if feedback_end_time == "none":
                    feedbackmodels = Comment.objects.filter(checktype=checktype)
                else:
                    feedbackmodels = Comment.objects.filter(checktype=checktype, time__lt=str_to_datetime(feedback_end_time))
            else:
                if feedback_end_time == "none":
                    feedbackmodels = Comment.objects.filter(checktype=checktype, time__gt=str_to_datetime(feedback_start_time))
                else:
                    feedbackmodels = Comment.objects.filter(checktype=checktype, time__gt=str_to_datetime(feedback_start_time), time__lt=str_to_datetime(feedback_end_time))
        else:
            if feedback_start_time == "none":
                if feedback_end_time == "none":
                    feedbackmodels = Comment.objects.filter(checktype=checktype, ctype=ctype)
                else:
                    feedbackmodels = Comment.objects.filter(checktype=checktype, ctype=ctype, time__lt=str_to_datetime(feedback_end_time))
            else:
                if feedback_end_time == "none":
                    feedbackmodels = Comment.objects.filter(checktype=checktype, ctype=ctype, time__gt=str_to_datetime(feedback_start_time))
                else:
                    feedbackmodels = Comment.objects.filter(checktype=checktype, ctype=ctype, time__gt=str_to_datetime(feedback_start_time), time__lt=str_to_datetime(feedback_end_time))
    return feedbackmodels

def change_feedback_models(feedback_id, checktype_str):
    feedbackmodels = Comment.objects.filter(id=feedback_id)
    checktype = checktype_str_to_int(checktype_str)
    if checktype_str == "already_ignore":
        feedback_point = 0
    elif checktype_str == "already_pass":
        feedback_point = 5
    elif checktype_str == "already_punish":
        feedback_point = -10
    else:
        feedback_point = 0
    if feedbackmodels.exists():
        feedbackmodel = feedbackmodels[0]
        users = User.objects.filter(stu_id=feedbackmodel.stu_id)
        if users.exists():
            feedbackmodel.checktype = checktype
            feedbackmodel.save()
            user = users[0]
            user.points = user.points+feedback_point
            feedbackmodel.save()
            user.save()
            return True
        else:
            return False
    else:
        return False
