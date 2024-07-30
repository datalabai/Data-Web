"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProfile } from "@/app/firebase"; // Ensure the correct path to your Firebase file

type ProfileData = {
  name: string;
  email: string;
  wallet: string;
  photo: string;
  amount: number;
  usdc: number;
};

type TransactionData = {
  sig: string;
  type: string;
  prompt: string;
  time: string | number | Date;
  amount: number;
};

function createData(transactionId: string, type: string, prompt: string, date: string, amount: number) {
  return { transactionId, type, prompt, date, amount };
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [rewardsData, setRewardsData] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile();
        if (profile) {
          setProfileData(profile.user);
          setTransactionData(profile.transactions);
          setRewardsData(profile.rewards);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}-${day}-${year} ${hours}:${minutes}`;
  };

  const sliceTransactionId = (transactionId: string) => {
    return transactionId.slice(0, 5) + '...' + transactionId.slice(-5);
  };

  const rows = transactionData.map((transaction) =>
    createData(
      transaction.sig,
      transaction.type,
      transaction.prompt,
      formatTimestamp(transaction.time),
      transaction.amount
    )
  );

  const rewardRows = rewardsData.map((reward) =>
    createData(
      reward.sig,
      reward.type,
      reward.prompt,
      formatTimestamp(reward.time),
      reward.amount
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  const image = profileData.photo;

  return (
    <ScrollArea className="h-screen">
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pr-4">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="flex sm:col-span-2">
                <Avatar className="m-3 w-24 h-24">
                  <AvatarImage src={image || "KS"} />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <CardHeader className="ml-0">
                  <CardTitle>{profileData.name}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {profileData.email}
                  </CardDescription>
                </CardHeader>
                <CardFooter></CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Balance</CardDescription>
                  <CardTitle className="text-4xl">${profileData.amount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+25% from last week</div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>USDC</CardDescription>
                  <CardTitle className="text-4xl">${profileData.usdc}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+10% from last month</div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="Transactions">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="Transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="Rewards">Rewards</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="Transactions">
                <Card>
                  <CardHeader className="px-7"></CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead className="hidden sm:table-cell">Prompt</TableHead>
                          <TableHead className="hidden sm:table-cell">Type</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="hidden md:table-cell">Suggested</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">{sliceTransactionId(transaction.transactionId)}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{transaction.prompt}</div>
                            </TableCell>
                            <TableCell className=" font-medium">
                              {transaction.type}
                            </TableCell>
                            <TableCell className="font-medium">
                              {transaction.date}
                            </TableCell>
                            <TableCell className=" font-medium">
                              {transaction.prompt}
                            </TableCell>
                            <TableCell className=" font-medium">
                              {transaction.amount} USDC
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="Rewards">
                <Card>
                  <CardHeader className="px-7"></CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead className="hidden sm:table-cell">Prompt</TableHead>
                          <TableHead className="hidden sm:table-cell">Type</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="hidden md:table-cell">Suggested</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rewardRows.map((reward, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">{sliceTransactionId(reward.transactionId)}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{reward.prompt}</div>
                            </TableCell>
                            <TableCell className=" font-medium">
                              {reward.type}
                            </TableCell>
                            <TableCell className="font-medium">
                              {reward.date}
                            </TableCell>
                            <TableCell className=" font-medium">
                              {reward.prompt}
                            </TableCell>
                            <TableCell className=" font-medium">
                              {reward.amount} USDC
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}