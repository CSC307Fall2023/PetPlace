import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  const loggedInData = await checkLoggedIn();
  if(loggedInData.loggedIn){
    const getpetprofile = await prisma.PetProfile.findFirst({
        where: {userId: loggedInData.id}
    })
    if(getpetprofile){
        return NextResponse.json(getpetprofile.petPhotos)
    }
    return NextResponse.json({error: 'petprofile doesnt have a gallery'}, {status: 405});

  }
  
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}