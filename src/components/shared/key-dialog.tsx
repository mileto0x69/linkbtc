"use client";

import { GOLDRUSH_API_KEY } from "@/utils/constants/helpers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const KeyDialog = () => {
  return (
    <AlertDialog open={!GOLDRUSH_API_KEY}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>GoldRush API key not found.</AlertDialogTitle>
          <AlertDialogDescription>
            This template requires a GoldRush API key. Please add your key to
            your environment variables file.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <a href="https://goldrush.dev/platform/auth/register/">
            <AlertDialogAction>Get API key</AlertDialogAction>
          </a>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
