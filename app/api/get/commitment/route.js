// export async function GET(request) {
//     try {
//         const commitments = await prisma.Commitment.findMany();
//         return NextResponse.json(commitments, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching Commitments:', error);
//         return NextResponse.json(
//             { error: 'Failed to fetch Commitments. ' + error.message },
//             { status: 500 }
//         );
//     } finally {
//         await prisma.$disconnect();
//     }
// }
