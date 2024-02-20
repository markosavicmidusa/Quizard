import { SignUp } from "@clerk/nextjs";
import { ClerkUserAttributes } from "@/lib/models/clerk.user.model";

export default function Registration() {
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
      <SignUp onComplete={handleSignUp} />
    </div>
  );
}
