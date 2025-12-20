'use client'

import { useState } from 'react'
import { Settings, User, Mail, Lock, Bell, Palette, Globe, Save } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-4">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'site', label: 'Site Settings', icon: Globe },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security', icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-pine-600 text-white'
                : 'text-charcoal/60 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="card p-8">
          <h2 className="text-xl font-bold text-charcoal mb-6">Profile Settings</h2>
          <form className="space-y-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pine-500 to-lake-500 flex items-center justify-center text-white text-3xl font-bold">
                A
              </div>
              <div>
                <button type="button" className="btn-secondary text-sm py-2 px-4 mb-2">
                  Change Avatar
                </button>
                <p className="text-sm text-charcoal/50">JPG or PNG. Max 2MB.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Display Name</label>
                <input type="text" className="input-field" defaultValue="The Editor" />
                <p className="text-xs text-charcoal/50 mt-1">This name will be shown on the personal blog</p>
              </div>
              <div>
                <label className="label-text">Email</label>
                <input type="email" className="input-field" defaultValue="admin@contentcontest.ca" />
              </div>
            </div>

            <div>
              <label className="label-text">Bio</label>
              <textarea
                rows={4}
                className="input-field resize-none"
                defaultValue="A passionate believer in local creativity and community connection."
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Site Settings Tab */}
      {activeTab === 'site' && (
        <div className="space-y-6">
          <div className="card p-8">
            <h2 className="text-xl font-bold text-charcoal mb-6">Contest Settings</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-text">Contest Start Day</label>
                  <select className="input-field" defaultValue="thursday">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Contest End Day</label>
                  <select className="input-field" defaultValue="sunday">
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="label-text">1st Place Prize</label>
                  <input type="text" className="input-field" defaultValue="$100" />
                </div>
                <div>
                  <label className="label-text">2nd Place Prize</label>
                  <input type="text" className="input-field" defaultValue="$50" />
                </div>
                <div>
                  <label className="label-text">3rd Place Prize</label>
                  <input type="text" className="input-field" defaultValue="$25" />
                </div>
              </div>

              <div>
                <label className="label-text">Submission Email</label>
                <input type="email" className="input-field" defaultValue="submit@contentcontest.ca" />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </form>
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-bold text-charcoal mb-6">Email Addresses</h2>
            <form className="space-y-4">
              <div>
                <label className="label-text">General Contact</label>
                <input type="email" className="input-field" defaultValue="hello@contentcontest.ca" />
              </div>
              <div>
                <label className="label-text">Sponsor Inquiries</label>
                <input type="email" className="input-field" defaultValue="sponsors@contentcontest.ca" />
              </div>
              <div>
                <label className="label-text">Help Hub Contact</label>
                <input type="email" className="input-field" defaultValue="volunteers@georginahelphub.ca" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card p-8">
          <h2 className="text-xl font-bold text-charcoal mb-6">Notification Preferences</h2>
          <div className="space-y-6">
            {[
              { label: 'New contest submissions', desc: 'Get notified when someone submits an entry', enabled: true },
              { label: 'New volunteer applications', desc: 'Get notified when someone applies to Help Hub', enabled: true },
              { label: 'New sponsor inquiries', desc: 'Get notified when a business wants to sponsor', enabled: true },
              { label: 'Weekly summary', desc: 'Receive a weekly email summary of activity', enabled: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-charcoal">{item.label}</p>
                  <p className="text-sm text-charcoal/50">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pine-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pine-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="card p-8">
          <h2 className="text-xl font-bold text-charcoal mb-6">Security Settings</h2>
          <form className="space-y-6">
            <div>
              <label className="label-text">Current Password</label>
              <input type="password" className="input-field" placeholder="Enter current password" />
            </div>
            <div>
              <label className="label-text">New Password</label>
              <input type="password" className="input-field" placeholder="Enter new password" />
            </div>
            <div>
              <label className="label-text">Confirm New Password</label>
              <input type="password" className="input-field" placeholder="Confirm new password" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}





