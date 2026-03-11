import { BookOpen, Phone, ExternalLink, Headset, Youtube } from "lucide-react";

export default function Resources() {
  const articles = [
    { title: "What Is Burnout? 6 Signs and How To Recover", src: "Cleveland Clinic", url: "https://health.clevelandclinic.org/signs-of-burnout/" },
    { title: "5 Simple Ways to Manage Stress", src: "Mindful", url: "https://www.mindful.org/how-to-manage-stress/" },
    { title: "The Science of Box Breathing", src: "Cleveland Clinic", url: "https://health.clevelandclinic.org/box-breathing-benefits/" },
  ];

  const helplines = [
    { name: "National Suicide Prevention Lifeline", number: "988", icon: Phone },
    { name: "Crisis Text Line", number: "Text HOME to 741741", icon: Phone },
    { name: "Student Mental Health Support (Campus)", number: "555-0199", icon: Headset },
  ];

  return (
    <div>
      <h1 className="page-title">Mental Health Resources</h1>
      <p className="page-subtitle">Curated content, guides, and emergency contacts to support your well-being.</p>

      <div className="dashboard-grid">
        <div className="card">
          <h2><BookOpen size={20} color="var(--accent-blue)" /> Helpful Reading</h2>
          <div className="flex flex-column gap-4" style={{ flexDirection: 'column' }}>
            {articles.map((article, idx) => (
              <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer" className="timeline-content hover-lift" style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>{article.title}</div>
                  <div className="text-muted text-xs mt-1">{article.src}</div>
                </div>
                <ExternalLink size={16} color="var(--text-muted)" />
              </a>
            ))}
          </div>
        </div>

        <div className="card">
          <h2><Phone size={20} color="#ef4444" /> Emergency Contacts</h2>
          <div className="flex flex-column gap-4" style={{ flexDirection: 'column' }}>
            {helplines.map((helpline, idx) => {
              const Icon = helpline.icon;
              return (
                <div key={idx} className="timeline-content" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                    <Icon size={20} color="#ef4444" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600' }}>{helpline.name}</div>
                    <div className="text-muted text-sm mt-1">{helpline.number}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card dashboard-full">
          <h2><Youtube size={20} color="#f59e0b" /> Recommended Video: 10-Minute Guided Meditation</h2>
          <div style={{ width: '100%', height: '400px', backgroundColor: 'var(--input-bg)', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/ZToicYcHIOU" 
              title="10-Minute Guided Meditation" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
