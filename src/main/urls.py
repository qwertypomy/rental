from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter, SimpleRouter

from main import views as main_views

router = DefaultRouter()
router.register(r'categories', main_views.CategoryViewSet)
router.register(r'items', main_views.ItemViewSet)
router.register(r'rentals', main_views.UserItemRentalViewSet, base_name='useritemrental')
router.register(r'rentals-unauthorised', main_views.UnauthorisedItemRentalViewSet, base_name='unauthoriseditemrental')
urlpatterns = router.urls

urlpatterns += [
    url(r'^categories/(?P<pk>\d+)/items/$', main_views.CategoryViewSet.as_view({'get': 'items'})),
    url(r'^all-rentals/$', main_views.AllRentalView.as_view())
]