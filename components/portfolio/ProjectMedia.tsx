import { sitePath } from "@/lib/site-path";
import type { Project } from "@/lib/projects";
function Lines({ count = 3 }: { count?: number }) {
  return (
    <div className="ui-lines">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
function Chrome({
  name,
  children,
  className = "",
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`ui-window ${className}`}>
      <div className="ui-top">
        <b>{name}</b>
        <span>— &nbsp; □ &nbsp; ···</span>
      </div>
      {children}
    </div>
  );
}
function Sidebar() {
  return (
    <aside className="ui-sidebar">
      <i className="ui-active" />
      <i />
      <i />
      <i />
      <i />
      <i />
    </aside>
  );
}
function Portal() {
  return (
    <Chrome name="WHIRLWIND" className="portal-window">
      <div className="ui-layout">
        <Sidebar />
        <div className="ui-main">
          <span className="ui-kicker">PROJECT PORTAL</span>
          <h4>Your projects, in one place.</h4>
          <div className="ui-tabs">
            Overview <span>Projects</span> Documents
          </div>
          <div className="stat-grid">
            <div>
              <Lines count={1} />
              <strong>Projects</strong>
            </div>
            <div>
              <Lines count={1} />
              <strong>Documents</strong>
            </div>
          </div>
          <div className="ui-table">
            {[
              "Building configuration",
              "Project details",
              "Drawings & documents",
              "Review & next steps",
            ].map((x, i) => (
              <div key={x}>
                <span className="mini-square">{i + 1}</span>
                <span>
                  {x}
                  <Lines count={1} />
                </span>
                <i className="status-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}
function Builder() {
  return (
    <>
      <Chrome name="flox / builder" className="builder-window">
        <div className="builder-toolbar">
          Pages <span>Desktop &nbsp; Mobile</span>
          <b>Publish ↗</b>
        </div>
        <div className="ui-layout">
          <Sidebar />
          <div className="builder-canvas">
            <div className="builder-selection">
              <span className="selection-label">Section</span>
              <div className="builder-shape" />
              <h4>
                Your next chapter
                <br />
                starts here.
              </h4>
              <Lines count={2} />
              <div className="ui-button">Get started →</div>
            </div>
            <div className="builder-blocks">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </Chrome>
      <div className="floating-tool">
        <span>↖</span> Component library <b>＋</b>
        <div className="component-grid">
          <i>H₁</i>
          <i>▧</i>
          <i>☰</i>
          <i>↗</i>
        </div>
      </div>
    </>
  );
}
function Property() {
  return (
    <Chrome name="speiz" className="property-window">
      <div className="property-intro">
        <span className="ui-kicker">SPACE FOR YOUR BUSINESS</span>
        <h4>
          Find your next
          <br />
          warehouse.
        </h4>
        <div className="ui-search">
          Location <span>Search ↗</span>
        </div>
      </div>
      <div className="property-grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className={`property-image property-image-${i}`}>
              <span>▧</span>
            </div>
            <Lines count={2} />
          </div>
        ))}
      </div>
    </Chrome>
  );
}
function Research() {
  return (
    <>
      <Chrome name="Research workspace" className="research-window">
        <div className="ui-layout">
          <Sidebar />
          <div className="ui-main">
            <span className="ui-kicker">RESEARCH / RESPONSES</span>
            <h4>
              From conversations
              <br />
              to clarity.
            </h4>
            <div className="video-panels">
              {[0, 1, 2].map((i) => (
                <div key={i}>
                  <div className="video-tile">
                    <span>▷</span>
                    <div className="waveform">
                      {Array.from({ length: 17 }, (_, j) => (
                        <i key={j} style={{ height: `${8 + ((j * 13 + i * 7) % 30)}px` }} />
                      ))}
                    </div>
                  </div>
                  <Lines count={2} />
                </div>
              ))}
            </div>
            <div className="ui-tabs">
              All responses <span>Highlights</span> Themes
            </div>
            <Lines count={3} />
          </div>
        </div>
      </Chrome>
      <div className="insight-panel">
        <span>✳ &nbsp; AI-assisted insights</span>
        <h4>Themes, connected.</h4>
        <Lines count={3} />
        <div className="insight-tag">Qualitative insights ↗</div>
      </div>
    </>
  );
}
function Compliance() {
  return (
    <Chrome name="Case workspace" className="compliance-window">
      <div className="ui-layout">
        <Sidebar />
        <div className="ui-main">
          <span className="ui-kicker">INVESTIGATION OVERVIEW</span>
          <h4>Follow the full picture.</h4>
          <div className="compliance-chart">
            <svg viewBox="0 0 360 150" fill="none">
              <path d="M0 120H360M0 80H360M0 40H360" stroke="#e8ebee" />
              <path
                d="M0 120L32 116L56 124L86 88L111 100L140 64L169 83L200 43L223 60L250 31L276 44L306 17L334 25L360 8"
                stroke="#637488"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="ui-table">
            {["Transactions", "Related entities", "Case activity", "Supporting evidence"].map(
              (x) => (
                <div key={x}>
                  <span>{x}</span>
                  <Lines count={1} />
                  <span>↗</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Chrome>
  );
}
function Learning() {
  return (
    <Chrome name="Mokyklėlė Pasaka" className="learning-window">
      <div className="ui-main">
        <span className="ui-kicker">LEARNING WORKSPACE</span>
        <h4>A place to learn.</h4>
        <div className="learning-grid">
          <div>
            <span>Aa</span>
            <Lines count={2} />
          </div>
          <div>
            <span>1 2 3</span>
            <Lines count={2} />
          </div>
          <div>
            <span>✳</span>
            <Lines count={2} />
          </div>
        </div>
        <Lines count={2} />
      </div>
    </Chrome>
  );
}
function Assessment() {
  return (
    <>
      <Chrome name="Assessment" className="assessment-window">
        <div className="ui-main">
          <span className="ui-kicker">DAMAGE REPORT</span>
          <h4>Every detail, documented.</h4>
          <div className="evidence-grid">
            <div>
              ＋<small>Evidence</small>
            </div>
            <div>
              ▧<small>Attachment</small>
            </div>
          </div>
          <Lines count={3} />
        </div>
      </Chrome>
      <div className="phone-window">
        <div className="phone-notch" />
        <span className="ui-kicker">ASSESSMENT</span>
        <h4>Add evidence</h4>
        <div className="upload-area">＋</div>
        <Lines count={2} />
        <div className="ui-button">Continue →</div>
      </div>
    </>
  );
}
function Commerce() {
  return (
    <Chrome name="TUKADA ↗" className="commerce-window">
      <div className="commerce-banner">
        <span className="ui-kicker">COMMERCIAL VEHICLE ENGINEERING</span>
        <h4>
          Built for
          <br />
          the work ahead.
        </h4>
        <span className="ui-button">Explore products ↗</span>
      </div>
      <div className="commerce-products">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div>▧</div>
            <Lines count={2} />
          </div>
        ))}
      </div>
    </Chrome>
  );
}
const previews = {
  portal: Portal,
  builder: Builder,
  property: Property,
  research: Research,
  compliance: Compliance,
  learning: Learning,
  assessment: Assessment,
  commerce: Commerce,
};
export function ProjectMedia({ project }: { project: Project }) {
  const Preview = previews[project.media];
  return (
    <div
      className={`project-media media-${project.media}${project.comingSoon ? " is-coming-soon" : ""}`}
      role="img"
      aria-label={`${project.name}${project.image ? ": project screenshot" : project.comingSoon ? ": preview unavailable" : ": illustrative preview"}${project.comingSoon ? " — Coming Soon" : ""}`}
    >
      {project.comingSoon ? null : project.image ? (
        <img src={sitePath(project.image)} alt="" className="replacement-image" />
      ) : (
        <div className="media-art" aria-hidden="true">
          <Preview />
        </div>
      )}
      {project.comingSoon && <span className="coming-soon-overlay">Coming Soon</span>}
    </div>
  );
}
