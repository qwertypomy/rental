from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import accounts.views

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'users', accounts.views.UserViewSet)
urlpatterns = router.urls

urlpatterns += [
    url(_(r'^register/$'),
        accounts.views.UserRegisterView.as_view(),
        name='register'),
    url(_(r'^login/$'),
        accounts.views.UserLoginView.as_view(),
        name='login'),
    url(_(r'^confirm/email/(?P<activation_key>.*)/$'),
        accounts.views.UserConfirmEmailView.as_view(),
        name='confirm_email'),
    url(_(r'^status/email/$'),
        accounts.views.UserEmailConfirmationStatusView.as_view(),
        name='status'),
    url(_(r'^profile/$'),
        accounts.views.CurrentUserView.as_view(),
        name='profile'),
]
