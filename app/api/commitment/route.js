// // pages/api/commitment.js
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import formidable from 'formidable';
// import path from 'path';

// const prisma = new PrismaClient();


// const form = new formidable.IncomingForm();
// form.uploadDir = path.join(process.cwd(), 'public/uploads'); // Save uploaded files to this directory
// form.keepExtensions = true; // Keep file extensions

// export async function POST(request) {
//     return new Promise((resolve, reject) => {
//         form.parse(request, async (err, fields, files) => {
//             if (err) {
//                 console.error('Error parsing form data:', err);
//                 return reject(new Error('Failed to parse form data.'));
//             }

//             try {
//                 // Iterate over the received commitments and save them to the database
//                 const commitments = [];

//                 for (let i = 0; i < Object.keys(fields.commitments).length; i++) {
//                     const commitment = {
//                         description: fields.commitments[i]['description'],
//                         file: files[`commitments[${i}][file]`]
//                             ? `/uploads/${path.basename(files[`commitments[${i}][file]`].filepath)}`
//                             : null,
//                     };

//                     // Save to Prisma
//                     const newCommitment = await prisma.Commitment.create({
//                         data: commitment,
//                     });

//                     commitments.push(newCommitment);
//                 }

//                 resolve(NextResponse.json({ commitments }, { status: 201 }));
//             } catch (error) {
//                 console.error('Error saving commitments:', error);
//                 resolve(NextResponse.json({ error: 'Failed to save commitments. ' + error.message }, { status: 500 }));
//             }
//         });
//     });
// }

// export const config = {
//     api: {
//         bodyParser: false, // Disable default body parsing to allow file uploads
//     },
// };
