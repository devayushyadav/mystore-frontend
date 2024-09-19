"use server";

import { cookies } from "next/headers";

let UnauthorizedCookieRequestType = false;

export async function deleteCookie(name) {
  cookies().delete(name);
}

export async function setCookie(name, value) {
  cookies().set(name, value);
}

export async function getCookie(name) {
  const cookie = cookies().get(name);
  return cookie ? cookie.value : null;
}

export async function unauthorizedCookiesRequest() {
  UnauthorizedCookieRequestType = true;
}

export async function checkUnauthorizedCookiesRequest() {
  return UnauthorizedCookieRequestType;
}
