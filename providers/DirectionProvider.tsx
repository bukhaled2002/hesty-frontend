"use client";
import { DirectionProvider as Provider } from "@radix-ui/react-direction";

export const DirectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider dir="rtl">{children}</Provider>;
};
