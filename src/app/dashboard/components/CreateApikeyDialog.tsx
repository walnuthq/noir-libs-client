import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from '@radix-ui/react-icons';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ApiKeyDto } from '@/app/dashboard/page';

interface CreateApikeyDialogButtonProps {
    onSuccess: (apiKey: string, apiKeyDto: ApiKeyDto) => void;
}

export function CreateApikeyDialogButton({ onSuccess }: CreateApikeyDialogButtonProps) {
    const [label, setLabel] = useState("");
    const [scopes, setScopes] = useState<string[]>(['publish']);
    const [expires, setExpires] = useState<string>("never");
    const [validity, setValidity] = useState<string>("");
    const [open, setOpen] = useState(false);

    const toggleScope = (scope: string) => {
        setScopes((prevScopes) =>
            prevScopes.includes(scope)
                ? prevScopes.filter((s) => s !== scope)
                : [...prevScopes, scope]
        );
    };

    const handleSubmit = async () => {
        let expiresDays: number | undefined;
        if (expires !== "never") {
            if (expires === "custom") {
                expiresDays = Number.parseInt(validity.trim());
            } else {
                expiresDays = Number.parseInt(expires.trim().replace("d", ""));
            }
        }
        const labelTrimmed = label.trim();
        const payload = {
            label: labelTrimmed === '' ? undefined : labelTrimmed,
            scopes,
            expiresDays,
        };

        try {
            const response = await fetch("/api/v1/auth/user/apikey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create API key");
            }

            const data = await response.json();
            setOpen(false);
            onSuccess(data.key, {
                id: data.id,
                label: data.label,
                scopes: data.scopes,
                expiresAt: data.expiresAt,
                createdAt: data.createdAt,
            });
        } catch (error) {
            console.error("Error creating API key:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-900">
                    <PlusIcon className="w-4 h-4"/>
                    Create API key
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create API key</DialogTitle>
                    <DialogDescription>
                        Please provide details about your API key.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col">
                        <label htmlFor="label" className="font-semibold ml-1 text-sm mb-1">
                            Label
                        </label>
                        <Input
                            id="label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold ml-1 text-sm mb-1">Scopes</span>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="publish"
                                    checked={scopes.includes("publish")}
                                    onCheckedChange={() => toggleScope("publish")}
                                />
                                <Label htmlFor="publish">Publish</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="yank"
                                    checked={scopes.includes("yank")}
                                    onCheckedChange={() => toggleScope("yank")}
                                />
                                <Label htmlFor="yank">Yank</Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold ml-1 text-sm mb-1">Expires</span>
                        <RadioGroup value={expires} onValueChange={setExpires}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="never" id="r1" />
                                <Label htmlFor="r1">Never</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="7d" id="r2" />
                                <Label htmlFor="r2">7 days</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="365d" id="r3" />
                                <Label htmlFor="r3">365 days</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="r4" />
                                <Label htmlFor="r4">Custom</Label>
                            </div>
                        </RadioGroup>

                        <div className="relative w-full mt-2">
                            <Input
                                disabled={expires !== "custom"}
                                id="validity"
                                value={validity}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (/^\d*$/.test(inputValue) && inputValue !== "0") {
                                        setValidity(inputValue);
                                    }
                                }}
                                className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 pr-10"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 select-none pointer-events-none">
                                days
                            </span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button className="bg-blue-900" type="submit" onClick={handleSubmit} disabled={scopes.length === 0}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
