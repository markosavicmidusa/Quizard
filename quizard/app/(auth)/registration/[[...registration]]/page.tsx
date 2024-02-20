import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// Define the custom interface for Clerk user attributes
interface ClerkUserAttributes {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  // Add other necessary properties
}

export default function Registration() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user?.id) {
      handleSignUp(user as ClerkUserAttributes);
    }
  }, [user, isSignedIn]);

  const handleSignUp = async (user: ClerkUserAttributes) => {
    try {
      const response = await fetch('/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkId: user.id, // Clerk's unique identifier for the user
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          // Other relevant user data
        }),
      });

      if (response.ok) {
        console.log('User registered in database successfully');
      } else {
        console.error('Failed to register user in database');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <SignUp />
    </div>
  );
}
