"use client";

import { Spinner } from "@/components/spinner";
// import { availablePlans } from "@/lib/plans";
import { useUser, SignOutButton } from "@clerk/nextjs";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
import { Toaster } from "react-hot-toast";

// async function fetchSubscriptionStatus() {
//   const response = await fetch("/api/profile/subscription-status");
//   return response.json();
// }

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  // const queryClient = useQueryClient();
  // const router = useRouter();

  // const [selectedPlan, setSelectedPlan] = useState<string>("");

  // const {
  //   data: subscription,
  //   // isLoading,
  //   // isError,
  //   // error,
  // } = useQuery({
  //   queryKey: ["subscription"],
  //   queryFn: fetchSubscriptionStatus,
  //   enabled: isLoaded && isSignedIn,
  //   staleTime: 5 * 60 * 1000,
  // });

  // const changePlanMutation = useMutation<any, Error, string>({
  //   mutationFn: async (newPlan: string) => {
  //     const res = await fetch("/api/profile/change-plan", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ newPlan }),
  //     });
  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(
  //         errorData.error || "Failed to change subscription plan."
  //       );
  //     }
  //     return res.json();
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["subscription"] });
  //     toast.success("Subscription plan updated successfully.");
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // const unsubscribeMutation = useMutation<any, Error, void>({
  //   mutationFn: async () => {
  //     const res = await fetch("/api/profile/unsubscribe", {
  //       method: "POST",
  //     });
  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.error || "Failed to unsubscribe.");
  //     }
  //     return res.json();
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["subscription"] });
  //     router.push("/subscribe");
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // const handleConfirmChangePlan = () => {
  //   if (selectedPlan) {
  //     changePlanMutation.mutate(selectedPlan);
  //     setSelectedPlan("");
  //   }
  // };

  // const handleChangePlan = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newSelectedPlan = e.target.value;
  //   if (newSelectedPlan) {
  //     setSelectedPlan(newSelectedPlan);
  //   }
  // };

  // const handleUnsubscribe = () => {
  //   if (
  //     confirm(
  //       "Are you sure you want to unsubscribe? You will lose access to premium features."
  //     )
  //   ) {
  //     unsubscribeMutation.mutate();
  //   }
  // };

  // const currentPlan = availablePlans.find(
  //   (plan) => plan.interval === subscription?.subscription?.subscriptionTier
  // );

  if (!isLoaded) {
    return (
      <div>
        <Spinner />
        Loading ...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div>
        <p>Please sign in to view your profile</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 p-4">
      <Toaster position="top-center" /> 
      <div className="w-full md:w-1/3 p-6 bg-indigo-500 text-white flex flex-col items-center rounded-2xl">
        <Image
          src={user.imageUrl || "/placeholder.png"}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">
          {user.firstName} {user.lastName}
        </h1>
        <p className="mb-4">{user.primaryEmailAddress?.emailAddress}</p>
        <SignOutButton>
          <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">Sign Out</button>
        </SignOutButton>
      </div>       
    </div>
  );
}
