from rest_framework import permissions


class IsStaffOrTargetUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return view.action == 'retrieve' or request.user.is_staff

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        return request.user.is_staff or obj == request.user