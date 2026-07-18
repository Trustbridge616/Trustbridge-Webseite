<template>
  <div class="calendar-card">
    <div class="calendar-header">
      <div class="icon-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      </div>
      <div>
        <h3>Box-Themen Vorschau</h3>
        <p>Das erwartet dich in den nächsten Monaten</p>
      </div>
    </div>
    
    <div class="calendar-timeline">
      <div class="timeline-line"></div>
      
      <div class="month-item current">
        <div class="month-node"></div>
        <div class="month-content">
          <div class="month-label">April <span class="badge-current">Aktuell</span></div>
          <div class="theme-box">
            <div class="theme-icon">⚡</div>
            <div class="theme-info">
              <strong>Tech & Gadgets</strong>
              <span>High-End Elektronik Highlights</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="month-item">
        <div class="month-node"></div>
        <div class="month-content">
          <div class="month-label">Mai</div>
          <div class="theme-box">
            <div class="theme-icon">🏕️</div>
            <div class="theme-info">
              <strong>Outdoor Royale</strong>
              <span>Abenteuer & Freizeit Equipment</span>
            </div>
          </div>
        </div>
      </div>

      <div class="month-item">
        <div class="month-node"></div>
        <div class="month-content">
          <div class="month-label">Juni</div>
          <div class="theme-box">
            <div class="theme-icon">🍕</div>
            <div class="theme-info">
              <strong>Gourmet & Kitchen</strong>
              <span>Exklusive Haushalts-Gadgets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-card {
  background: linear-gradient(180deg, #ffffff 0%, #fcfbfe 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(45,27,84,0.05);
  border: 1px solid rgba(212,175,55,0.15);
  margin-top: 1.5rem;
}

.calendar-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px dashed rgba(45,27,84,0.1);
  padding-bottom: 1.5rem;
}

.icon-wrap {
  background: linear-gradient(135deg, #D4AF37, #AA8222);
  color: #1a0a36;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(212,175,55,0.3);
}

.calendar-header h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #2D1B54;
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
}

.calendar-header p {
  color: #6b5b95;
  font-size: 0.9rem;
  margin: 0;
}

.calendar-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  padding-left: 20px;
}

.timeline-line {
  position: absolute;
  left: 5px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(to bottom, #D4AF37, rgba(45,27,84,0.1));
  border-radius: 2px;
}

.month-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
}

.month-node {
  position: absolute;
  left: -20px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e0d9f0;
  z-index: 2;
  box-shadow: 0 0 0 4px white;
  transition: all 0.3s ease;
}

.month-item.current .month-node {
  border-color: #D4AF37;
  background: #D4AF37;
  box-shadow: 0 0 0 4px rgba(212,175,55,0.2), 0 0 0 8px white;
}

.month-content {
  flex: 1;
}

.month-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 800;
  color: #6b5b95;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
}

.month-item.current .month-label {
  color: #2D1B54;
}

.badge-current {
  background: #D4AF37;
  color: #1a0a36;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(212,175,55,0.3);
}

.theme-box {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border: 1px solid rgba(45,27,84,0.06);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(45,27,84,0.02);
}

.month-item.current .theme-box {
  border-color: rgba(212,175,55,0.3);
  box-shadow: 0 8px 25px rgba(212,175,55,0.1);
  background: linear-gradient(to right, #ffffff, #fefdfa);
}

.month-item:hover .theme-box {
  transform: translateX(5px);
  border-color: rgba(45,27,84,0.15);
}

.month-item.current:hover .theme-box {
  border-color: rgba(212,175,55,0.5);
}

.theme-icon {
  font-size: 1.75rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f6ff;
  border-radius: 12px;
}

.month-item.current .theme-icon {
  background: rgba(212,175,55,0.1);
}

.theme-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.theme-info strong {
  color: #2D1B54;
  font-size: 1.05rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}

.theme-info span {
  color: #6b5b95;
  font-size: 0.85rem;
}
</style>
