
import { Client, Account } from 'appwrite';
const appwriteClient = new Client();

appwriteClient
    .setEndpoint(process.env.APPWRITE_ENDPOINT!) 
    .setProject(process.env.APPWRITE_PROJECT_ID!);

const account = new Account(appwriteClient);

export { appwriteClient, account };
