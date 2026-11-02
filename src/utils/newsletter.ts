/**
 * Mailchimp newsletter list, used by the signup form and the socials link.
 * To switch lists, only update these values (from Mailchimp's embedded form code).
 */
const MAILCHIMP_HOST = 'https://filmkunstfestival.us8.list-manage.com';
const MAILCHIMP_USER_ID = 'da1c3611e239cb857c6673aa3';
const MAILCHIMP_LIST_ID = '3e4ca7fbe7';

export const NEWSLETTER_URL = `${MAILCHIMP_HOST}/subscribe?u=${MAILCHIMP_USER_ID}&id=${MAILCHIMP_LIST_ID}`;

// Name of the hidden anti-bot field, Mailchimp only recognises it when it matches the list.
export const NEWSLETTER_HONEYPOT_NAME = `b_${MAILCHIMP_USER_ID}_${MAILCHIMP_LIST_ID}`;
