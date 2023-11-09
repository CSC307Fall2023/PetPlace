import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  const gallery = []
  let photogallery = await prisma.PetPhoto.findMany()
  gallery.push(photogallery)
  
  return NextResponse.json(gallery);
  
}
// const users = await prisma.User.findMany();
// const petProfiles = [];


// for (const user of users) {
//   let profiles = await prisma.PetProfile.findFirst({
//     where: {
//       userId: user.id
//     },
//   });
//   petProfiles.push(profiles);
// }