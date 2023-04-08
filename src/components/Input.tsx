import { useState } from "react";

export default function Input() {
  const [postalCode, setPostalCode] = useState("");

  return (
    <input
      id="postalCode"
      type="tel"
      placeholder="Postal Code"
      value={postalCode}
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        setPostalCode((e.target as HTMLInputElement).value)
      }
      className="py-1 px-1 rounded-md border border-blue-600 w-full text-sm"
      autoFocus={true}
    />
  );
}
