import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import HelpCenter from './HelpCenter';
import ProvideFeedback from './ProvideFeedback';
import Settings from './Settings';

export default function Profile({ user, setUser }) {
	// initialize form from user when the component mounts or user changes
	const initial = useMemo(() => ({
		firstName: (user?.name || "").split(" ").slice(0, 1).join(" "),
		lastName: (user?.name || "").split(" ").slice(1).join(" ") || "",
		email: user?.email || "",
		phone: user?.phone || "",
		country: user?.country || "",
		address1: user?.address || "",
		address2: user?.address2 || "",
		city: user?.city || "",
		state: user?.state || "",
		zip: user?.zip || "",
	}), [user]);

	const { t, i18n } = useTranslation();
	const [form, setForm] = useState(initial);
	const [dirty, setDirty] = useState(false);
	const [activeTab, setActiveTab] = useState('account');

	// Keep form in sync when `initial` changes (e.g., user prop updates)
	useEffect(() => {
		setForm(initial);
		setDirty(false);
	}, [initial]);

	// Handlers used by the form and buttons
	const handleChange = (e) => {
		const { name, value } = e.target || {};
		if (!name) return;
		setForm(prev => ({ ...prev, [name]: value }));
		setDirty(true);
	};

	const handleSave = () => {
		// Minimal save: if setUser is provided, update parent user object
		if (typeof setUser === 'function') {
			const newUser = {
				...user,
				name: `${form.firstName || ''} ${form.lastName || ''}`.trim(),
				email: form.email,
				phone: form.phone,
				country: form.country,
				address: form.address1,
				address2: form.address2,
				city: form.city,
				state: form.state,
				zip: form.zip,
			};
			setUser(newUser);
		}
		setDirty(false);
		// You can replace the above with an API call to persist changes.
	};

	// const navigate = useNavigate();

	return (
		<section className="py-5 main_sec">
			{/* spacer for header — restored to align content below header */}
			<div style={{ height: 'calc(var(--header-height, 72px) + 12px)' }} />
			<div className="container">
				<div className="row">
					{/* Sidebar */}
                        <aside className="col-lg-3 mb-4">
                        	<div className="glass-card p-3 panel--compact">
							<ul className="list-unstyled small mb-0">
								<li className="py-2">
									<button
										className={`btn btn-link p-0 text-start text-decoration-none${activeTab === 'account' ? ' fw-bold text-primary' : ' text-dark'}`}
										style={{ textDecoration: 'none' }}
										onClick={() => setActiveTab('account')}
									>
										Account
									</button>
								</li>
								<li className="py-2">
									<button
										className={`btn btn-link p-0 text-start text-decoration-none${activeTab === 'settings' ? ' fw-bold text-primary' : ' text-dark'}`}
										style={{ textDecoration: 'none' }}
										onClick={() => setActiveTab('settings')}
									>
										Settings
									</button>
								</li>
								<li className="py-2">
									<button
										className={`btn btn-link p-0 text-start text-decoration-none${activeTab === 'help' ? ' fw-bold text-primary' : ' text-dark'}`}
										style={{ textDecoration: 'none' }}
										onClick={() => setActiveTab('help')}
									>
										Help Center
									</button>
								</li>
								<li className="py-2">
									<button
										className={`btn btn-link p-0 text-start text-decoration-none${activeTab === 'feedback' ? ' fw-bold text-primary' : ' text-dark'}`}
										style={{ textDecoration: 'none' }}
										onClick={() => setActiveTab('feedback')}
									>
										Provide Feedback
									</button>
								</li>
							</ul>
						</div>
					</aside>
					   {/* Main content */}
					<div className="col-lg-9" style={{ minHeight: 'auto' }}>
						<div>
							{(activeTab === 'account' || activeTab === 'notifications' || activeTab === 'messages') && (
						<>
								<div className="d-flex align-items-start justify-content-between mb-3">
										<div>
											<h2 className="fw-bold">{t('account')}</h2>
											<div className="small text-muted">{t('personalInformation')}</div>
										</div>
										<div>
											<button
												className="btn btn-outline-secondary me-2"
												onClick={() => { setForm(initial); setDirty(false); }}
											>
												Reset
											</button>
											<button className="btn btn-primary" disabled={!dirty} onClick={handleSave}>
												{t('save')} {t('settings', { defaultValue: '' })}
											</button>
										</div>
									</div>
									<div className="mb-3">
										<nav className="nav nav-tabs">
											<button className={"nav-link " + (activeTab === 'account' ? 'active' : '')} onClick={() => setActiveTab('account')}>{t('account')}</button>
											<button className={"nav-link " + (activeTab === 'notifications' ? 'active' : '')} onClick={() => setActiveTab('notifications')}>{t('notificationPreferences')}</button>
											<button className={"nav-link " + (activeTab === 'messages' ? 'active' : '')} onClick={() => setActiveTab('messages')}>{t('messagePreferences')}</button>
										</nav>
									</div>
									   {activeTab === 'account' && (
										   <div className="glass-card transparent p-3 panel--compact" style={{ fontSize: '1.08rem' }}>
											<div className="mb-4 d-flex align-items-center gap-3">
												<div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#6c757d' }}>
													{form.firstName?.[0] || '?'}
												</div>
												<div>
													<div className="fw-bold" style={{ fontSize: 22 }}>{form.firstName} {form.lastName}</div>
													<div className="text-muted">{form.email}</div>
													{form.phone && <div className="text-muted">{form.phone}</div>}
												</div>
											</div>
										<div className="row g-3">
												<div className="col-md-6">
													<label className="form-label">First Name</label>
													<input name="firstName" value={form.firstName} onChange={handleChange} className="form-control" />
												</div>
												<div className="col-md-6">
													<label className="form-label">Last Name</label>
													<input name="lastName" value={form.lastName} onChange={handleChange} className="form-control" />
												</div>
												<div className="col-md-6">
													<label className="form-label">Email</label>
													<input name="email" value={form.email} onChange={handleChange} className="form-control" />
												</div>
												<div className="col-md-6">
													<label className="form-label">Mobile Phone Number (Optional)</label>
													<input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
												</div>
												<div className="col-12">
													<label className="form-label">Address (Optional)</label>
													<select name="country" value={form.country} onChange={handleChange} className="form-select mb-2">
														<option value="">Country</option>
														<option value="US">United States</option>
													</select>
													<input name="address1" value={form.address1} onChange={handleChange} className="form-control mb-2" placeholder="Street address or P.O. Box" />
													<input name="address2" value={form.address2} onChange={handleChange} className="form-control mb-2" placeholder="Apt, Suite, Unit, Building, Floor, etc." />
												</div>
												<div className="col-md-4">
													<label className="form-label">City</label>
													<input name="city" value={form.city} onChange={handleChange} className="form-control" />
												</div>
												<div className="col-md-4">
													<label className="form-label">State</label>
													<select name="state" value={form.state} onChange={handleChange} className="form-select">
														<option value="">State</option>
													</select>
												</div>
												<div className="col-md-4">
													<label className="form-label">Zip</label>
													<input name="zip" value={form.zip} onChange={handleChange} className="form-control" />
												</div>
												<div className="col-12 d-flex justify-content-end mt-2">
													<button type="submit" className="btn btn-primary" disabled={!dirty}>Save</button>
												</div>
											</div>
										</div>
									)}
									{activeTab === 'notifications' && (
										<div className="glass-card transparent p-3">
											   {/* ...existing notifications form... */}
										</div>
									)}
									{activeTab === 'messages' && (
										<div className="glass-card transparent p-3">
											   {/* ...existing messages form... */}
										</div>
									)}
								</>
							)}
							{activeTab === 'help' && (
								<div className="glass-card transparent p-3 panel--compact">
									<HelpCenter compact={true} />
								</div>
							)}
							{activeTab === 'settings' && (
								<div className="glass-card transparent p-3 panel--compact">
									<Settings compact={true} />
								</div>
							)}
							{activeTab === 'feedback' && (
								<div className="glass-card transparent p-3 panel--compact">
									<ProvideFeedback compact={true} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
