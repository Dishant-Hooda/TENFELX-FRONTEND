// app/api/projects/route.js (if using App Router)
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const project = await Project.create(data);
  return Response.json(project);
}

export async function GET() {
  await dbConnect();
  const projects = await Project.find().populate('postedBy');
  return Response.json(projects);
}
