from django.db.models import Q


def is_available(item, date_start, date_out):
    qr = Q(
            (Q(status='C') | Q(status='P')) & (
                Q(rental_date_start__range=(date_start, date_out)) |
                Q(rental_date_out__range=(date_start, date_out)) |
                Q(rental_date_start__lte=date_start, rental_date_out__gte=date_out)
            )
           )

    if item.useritemrental_set.filter(qr).first() or item.unauthoriseditemrental_set.filter(qr).first():
        return False
    return True


def available_items(items, date_start, date_out):
    if date_start and date_out:
        for item in items:
            if not is_available(item, date_start, date_out):
                items = items.exclude(pk=item.pk)
    return items
