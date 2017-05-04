from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.cache import cache_page

from base import views as base_views

urlpatterns = [
    url(r'^api/v1/', include('main.urls')),
    url(r'^api/v1/session-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v1/accounts/', include('accounts.urls')),
    url(r'^api/v1/getdata/', include('base.urls', namespace='base')),
    url(r'^admin/', admin.site.urls),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]
