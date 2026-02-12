"use client";

import { useState } from "react";
import { MapPin, Plus, Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AccountLayout } from "@/components/account/AccountLayout";
import { AddressForm } from "@/components/checkout/AddressForm";
import {
  useAddresses,
  useCreateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/lib/hooks/useAddresses";
import type { Address, AddressForm as AddressFormData } from "@/lib/types";

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<AddressFormData | undefined>();

  const handleAddAddress = () => {
    if (!formData) return;

    createAddress.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setFormData(undefined);
      },
    });
  };

  const handleDelete = (id: number) => {
    deleteAddress.mutate(id);
  };

  const handleSetDefault = (id: number) => {
    setDefaultAddress.mutate(id);
  };

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-navy">
            My Addresses
          </h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-navy hover:bg-navy-light">
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <AddressForm onChange={setFormData} />
              <Button
                onClick={handleAddAddress}
                disabled={!formData || createAddress.isPending}
                className="w-full bg-navy hover:bg-navy-light"
              >
                {createAddress.isPending ? "Saving..." : "Save Address"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Addresses List */}
        {addresses && addresses.length === 0 ? (
          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-navy/30" />
            </div>
            <h3 className="font-semibold text-navy mb-2">No addresses saved</h3>
            <p className="text-navy/60 mb-4">
              Add your first address to make checkout faster
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {addresses?.map((address: Address) => (
              <Card key={address.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-navy">{address.label}</h3>
                        {address.is_default && (
                          <Badge className="bg-sky text-white">Default</Badge>
                        )}
                      </div>
                      <div className="text-sm text-navy/70 space-y-0.5">
                        <p>{address.street_address}</p>
                        {(address.building || address.flat) && (
                          <p>
                            {address.building && `Building ${address.building}`}
                            {address.building && address.flat && ", "}
                            {address.flat && `Flat ${address.flat}`}
                          </p>
                        )}
                        <p>
                          {address.area}
                          {address.block && `, Block ${address.block}`}
                        </p>
                        <p>{address.city}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!address.is_default && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSetDefault(address.id)}
                          title="Set as default"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this address?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(address.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
