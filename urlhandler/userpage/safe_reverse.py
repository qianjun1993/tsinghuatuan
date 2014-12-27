from django.core.urlresolvers import reverse
from queryhandler.settings import SITE_DOMAIN


def s_reverse_validate(openid):
    return SITE_DOMAIN + reverse('userpage.views.validate_view', kwargs={'openid': openid})


def s_reverse_activity_detail(activityid):
    return SITE_DOMAIN + reverse('userpage.views.details_view', kwargs={'activityid': activityid})

def s_reverse_seat_map_detail(uid):
    return SITE_DOMAIN + reverse('userpage.views.seat_map_view', kwargs={'uid': uid}) 

def s_reverse_ticket_detail(uid):
    return SITE_DOMAIN + reverse('userpage.views.ticket_view', kwargs={'uid': uid})


def s_reverse_help():
    return SITE_DOMAIN + reverse('userpage.views.help_view')


def s_reverse_activity_menu(actid):
    return SITE_DOMAIN + reverse('userpage.views.activity_menu_view', kwargs={'actid': actid})

def s_reverse_user_feedback(weixin_id):
    return SITE_DOMAIN + reverse('userpage.views.feedback_view', kwargs={'weixin_id': weixin_id})

def s_reverse_user_exchange(weixin_id):
    return SITE_DOMAIN + reverse('userpage.views.exchange_view', kwargs={'weixin_id': weixin_id})

def s_reverse_user_item(weixin_id):
    return SITE_DOMAIN + reverse('userpage.views.item_view', kwargs={'weixin_id': weixin_id})



