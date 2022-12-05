import React from "react";
import {
  useAddress,
  useContract,
  useGrantRole,
  useRevokeRole,
} from "@thirdweb-dev/react";
import { Header } from "components/header";
import { CONTRACT_ADDRESS } from "constant";
import styles from "styles/Home.module.css";

const Settings = () => {
  const { contract } = useContract(CONTRACT_ADDRESS, "nft-drop");
  const address = useAddress();
  const { mutate: grantRole, isLoading, error } = useGrantRole(contract);
  const {
    mutate: revokeRole,
    isLoading: revokeLoading,
    error: revokeError,
  } = useRevokeRole(contract);

  if (error || revokeError) {
    console.error("failed to grant role", error);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { role, address } = e.target.elements;
      grantRole(
        { role: role.value, address: address.value },
        {
          onSuccess: () => {
            alert(role.value + " has been added");
            document.getElementById("role").reset();
          },
        }
      );
    } catch (error) {
      console.log("error: " + error);
      alert("error: " + error);
    }
  };
  const handleSubmitRevoke = async (e) => {
    try {
      e.preventDefault();
      const { role, address } = e.target.elements;
      revokeRole(
        { role: role.value, address: address.value },
        {
          onSuccess: () => {
            alert(role.value + " has been revoked");
            document.getElementById("revoke").reset();
          },
        }
      );
    } catch (error) {
      console.log("error: " + error);
      alert("error: " + error);
    }
  };
  return (
    <div className={styles.container + " container mx-auto"}>
      <Header />
      {!address ? (
        <p className="text-center text-primary mt-10">
          Please connect wallet to add courses
        </p>
      ) : (
        <div className="flex flex-col">
          <form onSubmit={handleSubmit} className="space-x-4 mt-10" id="role">
            <label>Grant Role</label>
            <select name="role" className="p-2 rounded-md">
              <option value="minter">Minter</option>
              <option value="admin">Admin</option>
            </select>
            <input
              name="address"
              placeholder="Address"
              className="p-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-primary p-2 rounded-md disabled:opacity-60"
              required
              disabled={isLoading}
            >
              Grant Role
            </button>
          </form>
          <form
            onSubmit={handleSubmitRevoke}
            className="space-x-4 mt-10"
            id="revoke"
          >
            <label>Revoke Role</label>
            <select name="role" className="p-2 rounded-md">
              <option value="minter">Minter</option>
              <option value="admin">Admin</option>
            </select>
            <input
              name="address"
              placeholder="Address"
              className="p-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-primary p-2 rounded-md disabled:opacity-60"
              required
              disabled={revokeLoading}
            >
              Revoke Role
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
