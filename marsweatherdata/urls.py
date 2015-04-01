from django.conf.urls import patterns, include, url
from django.contrib import admin
from marsdata import views as marsviews


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'marsweatherdata.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', marsviews.home, name="home"),
    url(r'data/$', marsviews.datahandler, name="data"),
    url(r'about/$', marsviews.about, name="about"),



)
