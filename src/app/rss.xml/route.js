import { NextResponse } from 'next/server';
import { projects, experiences, research } from '@/constants';


function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shiva.codes';
  
  
  const projectItems = projects.map(project => {
    const title = escapeXml(project.title);
    const category = escapeXml(project.category);
    const description = project.description; // Keep original for CDATA
    const techStack = project.techstacks.join(', ');
    const status = project.status;
    const link = project.link || `${siteUrl}/projects`;
    const guid = project.link || `${siteUrl}/projects#${project.title.toLowerCase().replace(/\s+/g, '-')}`;

    return `
    <item>
      <title>${title} - ${category}</title>
      <description><![CDATA[
        <p>${description}</p>
        <br/>
        <p><strong>Tech Stack:</strong> ${techStack}</p>
        <p><strong>Status:</strong> ${status}</p>
        ${project.link ? `<p><strong>Repository:</strong> <a href="${project.link}">${project.link}</a></p>` : ''}
      ]]></description>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(guid)}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Project</category>
    </item>`;
  }).join('');

  // Generate experience items
  const experienceItems = experiences.map(exp => {
    const role = escapeXml(exp.role);
    const company = escapeXml(exp.company);
    const year = exp.year;
    const responsibility = exp.responsibility;
    const techStacks = exp.techstacks.join(', ');
    const companySlug = exp.company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return `
    <item>
      <title>${role} at ${company}</title>
      <description><![CDATA[
        <p><strong>Duration:</strong> ${year}</p>
        <br/>
        <p><strong>Responsibilities:</strong></p>
        <p>${responsibility}</p>
        <br/>
        <p><strong>Technologies Used:</strong> ${techStacks}</p>
      ]]></description>
      <link>${siteUrl}/experience</link>
      <guid>${siteUrl}/experience#${companySlug}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Experience</category>
    </item>`;
  }).join('');

  // Generate research items
  const researchItems = research.map(paper => {
    const title = escapeXml(paper.title);
    const category = escapeXml(paper.category);
    const description = paper.description; // Keep original for CDATA
    const techStack = paper.techstacks.join(', ');
    const status = paper.status;
    const journal = escapeXml(paper.journal);
    const year = paper.year;
    const collaboration = paper.collaboration ? escapeXml(paper.collaboration) : '';
    const paperSlug = paper.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return `
    <item>
      <title>${title}</title>
      <description><![CDATA[
        <p><strong>Category:</strong> ${category}</p>
        <br/>
        <p><strong>Abstract:</strong></p>
        <p>${description}</p>
        <br/>
        <p><strong>Journal:</strong> ${journal}</p>
        <p><strong>Year:</strong> ${year}</p>
        ${collaboration ? `<p><strong>Collaboration:</strong> ${collaboration}</p>` : ''}
        <p><strong>Status:</strong> ${status === 'under-review' ? 'Under Review' : status}</p>
        <br/>
        <p><strong>Technologies/Methods:</strong> ${techStack}</p>
      ]]></description>
      <link>${siteUrl}/research</link>
      <guid>${siteUrl}/research#${paperSlug}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Research</category>
    </item>`;
  }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Shiva Bhattacharjee - Full Stack Developer &amp; Researcher</title>
    <description>Hello there I am Shiva a full stack developer and researcher. I love to build products that make people&apos;s life easier. Explore my projects, research publications, experience, and journey in software development and AI research.</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <category>Technology</category>
    <category>Software Development</category>
    <category>Web Development</category>
    <category>Research</category>
    <category>Artificial Intelligence</category>
    <generator>Next.js Portfolio RSS Generator</generator>
    
    <item>
      <title>Welcome to My Portfolio</title>
      <description><![CDATA[
        <p>Hello there! I'm Shiva Bhattacharjee, a full-stack developer passionate about creating amazing products that make people's lives easier.</p>
        <br/>
        <p>I specialize in:</p>
        <ul>
          <li>Software Engineering</li>
          <li>Web Development</li>
          <li>Graphic Design</li>
          <li>Problem Solving</li>
          <li>Creative Thinking</li>
        </ul>
        <br/>
        <p>Currently working as Co-Founder and Software Engineer at Navdyut AI Tech and Research Labs Pvt. Ltd., where I lead AI research and develop innovative solutions.</p>
      ]]></description>
      <link>${siteUrl}</link>
      <guid>${siteUrl}#about</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>About</category>
    </item>
    ${projectItems}
    ${experienceItems}
    ${researchItems}
    <item>
      <title>Contact and Connect</title>
      <description><![CDATA[
        <p>Interested in collaborating or have questions? I'd love to hear from you!</p>
        <br/>
        <p>You can reach out to me through my portfolio website for any opportunities, collaborations, or just to say hello.</p>
        <br/>
        <p>Let's build something amazing together! 🚀</p>
      ]]></description>
      <link>${siteUrl}#contact</link>
      <guid>${siteUrl}#contact</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Contact</category>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
