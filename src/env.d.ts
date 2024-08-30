/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import { Session } from '@lib/appwrite';

declare namespace App {
  interface Locals {
    user: Session | null;
  }
}