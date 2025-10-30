"use client"

import { useState } from "react"
import Link from "next/link"

const documentTree = {
  Japan: {
    "Visa Types": ["特定技能 (SSW)", "技能実習 (Technical Intern)", "高度専門 (Highly Skilled)"],
    Requirements: ["Language Requirements", "Education Requirements", "Work Experience"],
    "Application Process": ["Step 1: Preparation", "Step 2: Submission", "Step 3: Interview"],
    "Interview Tips": ["Common Questions", "Cultural Etiquette", "Dress Code"],
  },
  Korea: {
    "Visa Types": ["E-9 (Non-Professional)", "H-2 (Working Visit)", "E-7 (Specified Activities)"],
    Requirements: ["Language Requirements", "Education Requirements", "Work Experience"],
    "Application Process": ["Step 1: Preparation", "Step 2: Submission", "Step 3: Interview"],
  },
}

export default function ContentManagement() {
  const [selectedDoc, setSelectedDoc] = useState("特定技能 (SSW)")
  const [isEditing, setIsEditing] = useState(true)
  const [docTitle, setDocTitle] = useState("特定技能 (SSW) Visa Guide")
  const [docContent, setDocContent] = useState(
    "# 特定技能 (SSW) Visa Overview\n\nThe Specified Skilled Worker (SSW) visa is designed for foreign workers with specific skills...\n\n## Eligibility Requirements\n\n- Japanese language proficiency (JLPT N4 or equivalent)\n- Relevant work experience or training\n- Pass the skills evaluation test\n\n## Application Process\n\n1. Obtain a Certificate of Eligibility (COE)\n2. Apply for visa at Japanese embassy\n3. Enter Japan within 3 months",
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-[#2d5f56] text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Workabroadly Admin</h1>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/admin" className="hover:text-[#ffe100] transition">
              Dashboard
            </Link>
            <Link href="/admin/users" className="hover:text-[#ffe100] transition">
              Users
            </Link>
            <Link href="/admin/content" className="hover:text-[#ffe100] transition">
              Content
            </Link>
            <Link href="/admin/analytics" className="hover:text-[#ffe100] transition">
              Analytics
            </Link>
            <Link href="/admin/settings" className="hover:text-[#ffe100] transition">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ffe100] text-[#2d5f56] flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-[#1a3d36] text-white h-[calc(100vh-64px)] sticky top-16">
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition">
              <span>📊</span>
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>👥</span>
              <span>User Management</span>
            </Link>
            <Link href="/admin/content" className="flex items-center gap-3 p-3 rounded-lg bg-[#2d5f56] m-2 transition">
              <span>📝</span>
              <span>Content Management</span>
            </Link>
            <Link
              href="/admin/scenarios"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>🎭</span>
              <span>Scenario Manager</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>📈</span>
              <span>Evaluation & Metrics</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>⚙️</span>
              <span>System Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex h-[calc(100vh-64px)]">
          {/* Document Tree Panel */}
          <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-3 py-2 text-sm focus:outline-none focus:border-[#55aa99]"
              />
            </div>

            <div className="space-y-4">
              {Object.entries(documentTree).map(([country, categories]) => (
                <div key={country}>
                  <div className="font-bold text-[#1a3d36] mb-2 flex items-center gap-2">
                    <span>{country === "Japan" ? "🇯🇵" : "🇰🇷"}</span>
                    <span>{country}</span>
                  </div>
                  {Object.entries(categories).map(([category, docs]) => (
                    <div key={category} className="ml-4 mb-2">
                      <div className="text-sm font-medium text-[#55aa99] mb-1">▶ {category}</div>
                      {docs.map((doc) => (
                        <button
                          key={doc}
                          onClick={() => setSelectedDoc(doc)}
                          className={`w-full text-left text-sm p-2 rounded-lg hover:bg-[#f0f9f7] transition ml-4 ${
                            selectedDoc === doc ? "bg-[#e8f4f2] border-l-4 border-[#55aa99]" : ""
                          }`}
                        >
                          {doc}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button className="w-full mt-4 rounded-xl bg-[#55aa99] text-white px-4 py-2 text-sm hover:bg-[#45baa9] transition">
              + New Document
            </button>
          </div>

          {/* Editor Panel */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Page Header */}
              <div>
                <h1 className="text-3xl font-bold text-[#1a3d36] mb-2">Knowledge Base Management</h1>
                <p className="text-gray-600">Manage visa information and career guidance content</p>
              </div>

              {/* Document Header */}
              <div className="rounded-2xl bg-white shadow-lg p-8">
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full text-2xl font-bold border-b-2 border-[#b3d9d0] p-2 mb-4 focus:outline-none focus:border-[#55aa99]"
                  placeholder="Document Title"
                />

                <div className="flex flex-wrap gap-3 text-sm">
                  <select className="rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-3 py-1 focus:outline-none focus:border-[#55aa99]">
                    <option>Category: Visa Types</option>
                    <option>Requirements</option>
                    <option>Application Process</option>
                  </select>
                  <select className="rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-3 py-1 focus:outline-none focus:border-[#55aa99]">
                    <option>Country: Japan</option>
                    <option>Korea</option>
                  </select>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#e8f4f2] text-[#55aa99] text-xs">SSW</span>
                    <span className="px-3 py-1 rounded-full bg-[#e8f4f2] text-[#55aa99] text-xs">Work Visa</span>
                  </div>
                  <span className="text-gray-500 ml-auto">Last updated: Oct 27, 2025</span>
                </div>
              </div>

              {/* Editor Toolbar */}
              <div className="rounded-xl bg-[#f0f9f7] shadow-md p-3 flex flex-wrap gap-2">
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition">
                  <strong>B</strong>
                </button>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition">
                  <em>I</em>
                </button>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition">
                  <u>U</u>
                </button>
                <div className="w-px bg-gray-300"></div>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition text-sm">H1</button>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition text-sm">H2</button>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition text-sm">H3</button>
                <div className="w-px bg-gray-300"></div>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition">• List</button>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition">1. List</button>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition">🔗 Link</button>
                <button className="p-2 rounded-lg hover:bg-white active:bg-[#e8f4f2] transition">📷 Image</button>
              </div>

              {/* Tab Toggle */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    isEditing ? "bg-[#55aa99] text-white" : "bg-white text-gray-600"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    !isEditing ? "bg-[#55aa99] text-white" : "bg-white text-gray-600"
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Editor Area */}
              <div className="rounded-2xl bg-white shadow-lg p-8">
                {isEditing ? (
                  <textarea
                    value={docContent}
                    onChange={(e) => setDocContent(e.target.value)}
                    className="w-full min-h-96 font-mono text-sm focus:outline-none"
                    placeholder="Write your content here... Markdown supported"
                  />
                ) : (
                  <div className="prose max-w-none">
                    <h1>特定技能 (SSW) Visa Overview</h1>
                    <p>
                      The Specified Skilled Worker (SSW) visa is designed for foreign workers with specific skills...
                    </p>
                    <h2>Eligibility Requirements</h2>
                    <ul>
                      <li>Japanese language proficiency (JLPT N4 or equivalent)</li>
                      <li>Relevant work experience or training</li>
                      <li>Pass the skills evaluation test</li>
                    </ul>
                    <h2>Application Process</h2>
                    <ol>
                      <li>Obtain a Certificate of Eligibility (COE)</li>
                      <li>Apply for visa at Japanese embassy</li>
                      <li>Enter Japan within 3 months</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Source Attachments */}
              <div className="rounded-xl bg-white shadow-md p-6">
                <h3 className="font-bold text-[#1a3d36] mb-4">Official Sources & References</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#f0f9f7]">
                    <div className="flex items-center gap-2">
                      <span>📄</span>
                      <span className="text-sm">Immigration Services Agency - SSW Guide.pdf</span>
                    </div>
                    <button className="text-red-600 text-sm hover:underline">Remove</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#f0f9f7]">
                    <div className="flex items-center gap-2">
                      <span>🔗</span>
                      <span className="text-sm">https://www.moj.go.jp/isa/ssw</span>
                    </div>
                    <button className="text-red-600 text-sm hover:underline">Remove</button>
                  </div>
                </div>
                <button className="mt-3 text-[#55aa99] text-sm font-medium hover:underline">+ Add Source</button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button className="rounded-xl bg-white border-2 border-[#b3d9d0] text-[#2d5f56] px-6 py-2 hover:bg-gray-50 transition">
                  Save Draft
                </button>
                <button className="rounded-xl bg-[#55aa99] text-white px-6 py-2 shadow-md hover:bg-[#45baa9] transition">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
