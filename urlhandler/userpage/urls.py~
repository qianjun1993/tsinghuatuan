from django.conf.urls import patterns, url, include

urlpatterns = patterns('',
                       url(r'^$', 'userpage.views.home'),
                       url(r'^validate/gettime/$', 'userpage.views.validate_gettime'),
                       url(r'^selectseat/$', 'userpage.views.selectseat'),
                       url(r'^validate/try/$', 'userpage.views.validate_post'),
                       url(r'^validate/(?P<openid>\S+)/$', 'userpage.views.validate_view'),
                       url(r'^activity/(?P<activityid>\d+)/$','userpage.views.details_view'),
                       url(r'^ticket/(?P<uid>\S+)/$','userpage.views.ticket_view'),
		               url(r'^seat/(?P<uid>\S+)/$','userpage.views.seat_map_view'),
                       url(r'^help/$','userpage.views.help_view'),
                       url(r'^helpact/$','userpage.views.helpact_view'),
                       url(r'^helpclub/$','userpage.views.helpclub_view'),
                       url(r'^helplecture/$','userpage.views.helplecture_view'),
                       url(r'^activity/(?P<actid>\d+)/menu/$', 'userpage.views.activity_menu_view'),

                       url(r'^feedback/try/$', 'userpage.views.feedback_post'),  
                       url(r'^feedback/(?P<weixin_id>\S+)/$','userpage.views.feedback_view'),
                       url(r'^exchange/try/$','userpage.views.exchange_post'),
                       url(r'^exchange/(?P<weixin_id>\S+)/$','userpage.views.exchange_view'),
                        url(r'^item/(?P<weixin_id>\S+)/$','userpage.views.item_view'),
                        
                       )
