<template>
  <AppLayout>
    <div class="partner-page">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="hero-wave"></div>
        <div class="hero-content">
          <div style="display: inline-block; background: rgba(226,0,116,0.15); color: #FF4DA6; border: 1px solid rgba(226,0,116,0.3); padding: 8px 20px; border-radius: 50px; font-size: 0.95rem; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 25px; box-shadow: 0 0 20px rgba(226,0,116,0.3);">
            🚀 Du bist direkt profitabel!
          </div>
          <h1>Im Einkauf liegt<br/><span class="magenta-text">dein Gewinn.</span></h1>
          <p style="font-size: 1.25rem; font-weight: 500; margin-bottom: 2rem; color: #E2D9F3; line-height: 1.6;">
            <strong>Qualitätsgarantie!</strong> Eine TrustBox enthält geprüfte Markenware deutlich unter verkaufsüblichem Marktwert, damit du profitierst!<br/>
            Egal ob Weiterverkaufen oder selbst nutzen: <span style="color: #fff; font-weight: bold;">Du gewinnst immer.</span>
          </p>
          <div class="hero-pricing">
            
            <!-- Category Pills -->
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(226,0,116,0.3); padding: 8px 18px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: bold; color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.3); backdrop-filter: blur(10px);">
                <span style="font-size: 1.2rem;">👟</span> Schuhe
              </div>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(226,0,116,0.3); padding: 8px 18px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: bold; color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.3); backdrop-filter: blur(10px);">
                <span style="font-size: 1.2rem;">👕</span> Mode
              </div>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(226,0,116,0.3); padding: 8px 18px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: bold; color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.3); backdrop-filter: blur(10px);">
                <span style="font-size: 1.2rem;">👜</span> Taschen
              </div>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(226,0,116,0.3); padding: 8px 18px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: bold; color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.3); backdrop-filter: blur(10px);">
                <span style="font-size: 1.2rem;">✨</span> Parfum
              </div>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(226,0,116,0.3); padding: 8px 18px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: bold; color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.3); backdrop-filter: blur(10px);">
                <span style="font-size: 1.2rem;">🔌</span> Technik
              </div>
            </div>
            <div class="price-display" style="flex-direction: column; align-items: center; margin-bottom: 2.5rem; background: rgba(10,5,20,0.7); padding: 2rem; border-radius: 20px; border: 1px solid rgba(226,0,116,0.2); width: 100%; box-sizing: border-box; box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 0 20px rgba(226,0,116,0.05); backdrop-filter: blur(10px);">
              <!-- Price / Einsatz (Top) -->
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="display: block; font-size: 1.15rem; color: #E2D9F3; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px;">Dein Einsatz:</span>
                <span style="display: block; font-size: 3.5rem; font-weight: 900; color: #E20074; text-shadow: 0 0 30px rgba(226,0,116,0.8); line-height: 1;">Ab 111 € <span style="font-size: 2rem; vertical-align: baseline;">starten</span></span>
              </div>
              
              <!-- Divider -->
              <div style="width: 80px; height: 3px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); margin: 0 auto 20px;"></div>

              <!-- Return / Gewinn (Bottom) -->
              <div style="text-align: center;">
                <span style="display: block; font-size: 2.4rem; font-weight: 900; color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.5); line-height: 1.1;">ca. 220–250 € <span style="font-size: 1.6rem; color: #fff;">Warenwert</span></span>
                <span style="display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 1.2rem; color: #E2D9F3; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-top: 12px;">
                  <span style="color: #F4D068; text-shadow: 0 0 10px rgba(244,208,104,0.5);">✓</span> Echter Amazon-Vergleichswert
                </span>
              </div>
            </div>
            <a href="#tariffs" @click.prevent="scrollToTariffs" class="btn-check-availability" style="box-shadow: 0 10px 25px rgba(226,0,116,0.4); border: 1px solid rgba(255,255,255,0.2);">Direkt starten <span class="arrow">›</span></a>
            
            <a href="#tariffs" @click.prevent="scrollToTariffs" style="text-decoration: none; display: block; margin-top: 1.5rem; width: 100%;">
              <div style="background: rgba(226, 0, 116, 0.15); border: 1px solid rgba(226, 0, 116, 0.6); padding: 15px 20px; border-radius: 12px; box-shadow: 0 0 25px rgba(226, 0, 116, 0.4); transition: all 0.3s ease; text-align: center;" class="hero-glow-box">
                <span style="display: block; font-size: 1.1rem; font-weight: bold; color: #fff; margin-bottom: 5px;">Keine Anmeldung. Kein Händlerschein. Echte Markenware.</span>
                <span style="display: block; font-size: 0.95rem; color: #E2D9F3;">Kleinanzeigen, Vinted, Ebay & Flohmarkt.</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- MAGENTA BANNER -->
      <section class="magenta-banner-container">
        <div class="magenta-banner">
          <div class="banner-text">
            <h2 style="font-size: 2.2rem; margin-bottom: 25px; line-height: 1.1;">WIR BRINGEN DIR<br/>DIE BESTEN DEALS</h2>
            
            <h3 style="font-size: 1.4rem; font-weight: 900; margin-bottom: 5px; font-style: italic;">Was wird wirklich verschickt?</h3>
            <p style="font-size: 1.15rem; margin-bottom: 20px; color: #fff; font-weight: bold;">Echte Beispiele aus unseren TrustBox-Paketen.</p>
            
            <p style="font-size: 1.1rem; font-style: normal; font-weight: 900; color: #111; line-height: 1.6;">
              ✓ Echte Markenware.<br/>
              ✓ Fairer Warenwert.<br/>
              ✓ Qualität, auf die du bauen kannst.
            </p>
          </div>
          <!-- Placeholder for family image -->
          <div class="banner-image"></div>
        </div>
      </section>

      <!-- PROOF SLIDER SECTION -->
      <section class="proof-slider-section" style="padding-top: 10px;">
        <div class="marquee-wrapper">
          <div class="marquee-content">
            <!-- Set 1 -->
            <div class="proof-card">
              <div class="proof-image-wrapper">
                <img src="/box_3_example.png" alt="111€ Box" class="proof-image" />
              </div>
              <div class="proof-info">
                <h4>111 €</h4>
              </div>
            </div>
            <div class="proof-card">
              <div class="proof-image-wrapper">
                <img src="/box_4_example.png" alt="333€ Box" class="proof-image" />
              </div>
              <div class="proof-info">
                <h4>333 €</h4>
              </div>
            </div>
            <div class="proof-card">
              <div class="proof-image-wrapper">
                <img src="/box_5_example.png" alt="999€ Box" class="proof-image" />
              </div>
              <div class="proof-info">
                <h4>999 €</h4>
              </div>
            </div>
            <!-- Set 2 (Duplicated for seamless scroll) -->
            <div class="proof-card">
              <div class="proof-image-wrapper">
                <img src="/box_3_example.png" alt="111€ Box" class="proof-image" />
              </div>
              <div class="proof-info">
                <h4>111 €</h4>
              </div>
            </div>
            <div class="proof-card">
              <div class="proof-image-wrapper">
                <img src="/box_4_example.png" alt="333€ Box" class="proof-image" />
              </div>
              <div class="proof-info">
                <h4>333 €</h4>
              </div>
            </div>
            <div class="proof-card">
              <div class="proof-image-wrapper">
                <img src="/box_5_example.png" alt="999€ Box" class="proof-image" />
              </div>
              <div class="proof-info">
                <h4>999 €</h4>
              </div>
            </div>
          </div>
        </div>
        
        <div class="container text-center" style="max-width: 800px; margin: 40px auto 0;">
          <div style="font-size: 1rem; color: #444; line-height: 1.7; border: 1px solid rgba(226,0,116,0.2); padding: 25px 35px; border-radius: 16px; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
            <div style="font-size: 2rem; margin-bottom: 15px;">📦</div>
            <p style="margin: 0;">Unsere TrustBoxen enthalten wechselnde Markenware aus Kategorien wie Schuhe, Mode, Technik, Parfums, Taschen, Haushalt und Accessoires. Die genaue Zusammenstellung variiert je nach Verfügbarkeit.<br/><br/>
            <span style="color: #E20074; font-weight: 900; font-size: 1.1rem;">Der Warenwert bleibt garantiert. Dein Gewinn hängt vom Weiterverkauf ab.</span></p>
          </div>
        </div>
      </section>

      
      <section id="tariffs" class="tariffs-section">
        <div class="container">
          <div class="tariffs-grid">
            
            <!-- CARD 1: Starter -->
            <div class="tariff-card" style="display: flex; flex-direction: column;">
              <div class="card-badge blue-badge">Am schnellsten</div>
              <div class="card-header" style="justify-content: flex-start; padding-bottom: 0;">
                <div class="tariff-title" style="font-size: 1.2rem; display: flex; align-items: center; gap: 8px; margin-left: 25px;">
                  <span style="font-size: 1.2rem;">📦</span> <span style="color: #111; font-weight: bold;">Starter</span>
                </div>
              </div>
              <div style="padding: 10px 25px;">
                <img src="/box_1_example.png" alt="Starter Box" style="width: 100%; border-radius: 8px; margin-bottom: 15px; object-fit: contain;" />
                <div style="font-size: 2.8rem; font-weight: 900; color: #E20074; line-height: 1; text-shadow: 0 0 15px rgba(226,0,116,0.3);">111 €</div>
                <div style="font-size: 1rem; color: #444; margin-top: 6px; font-weight: 600;">+ 10 € pauschaler Versand</div>
                <div style="font-size: 1.5rem; font-weight: bold; color: #111; margin-top: 10px;">Einfach testen</div>
              </div>
              <div style="margin: 0 25px 15px; padding: 12px; background: #333; border: 1px solid rgba(142,245,210,0.4); border-radius: 8px; text-align: center; box-shadow: inset 0 0 15px rgba(142,245,210,0.1), 0 5px 15px rgba(0,0,0,0.1);">
                <span style="display: block; color: #8EF5D2; font-weight: 900; font-size: 1.3rem; text-shadow: 0 0 15px rgba(142,245,210,0.8), 0 0 30px rgba(142,245,210,0.4);">Garantiert 220–250 € Warenwert</span>
              </div>
              <ul class="features-list" style="border-top: 1px solid #eee; padding-top: 20px; margin: 0 25px; flex-grow: 1; line-height: 1.5; font-size: 1.05rem; font-weight: 600;">
                <li style="margin-bottom: 12px; color: #333;"><span class="check" style="color: #E20074;">✓</span> Teste die Qualität unserer Ware</li>
                <li style="margin-bottom: 12px; color: #333;"><span class="check" style="color: #E20074;">✓</span> Ideal zum Einsteigen und Testen</li>
                <li style="color: #333;"><span class="check" style="color: #E20074;">✓</span> Perfekt zum privaten Weiterverkauf</li>
              </ul>
              <div class="card-footer" style="padding: 20px 25px;">
                <button class="btn-check" style="background: #E20074; width: 100%; border-radius: 6px; padding: 15px; color: white; font-weight: bold; font-size: 1.15rem; border: none; cursor: pointer; box-shadow: 0 5px 15px rgba(226,0,116,0.3);">Starter wählen</button>
              </div>
            </div>

            <!-- CARD 2: Reseller -->
            <div class="tariff-card card-highlighted" style="display: flex; flex-direction: column; border: 2px solid #E20074; position: relative;">
              <div class="card-badge magenta-badge">Empfehlung</div>
              <div class="card-header" style="justify-content: flex-start; padding-bottom: 0;">
                <div class="tariff-title" style="font-size: 1.2rem; display: flex; align-items: center; gap: 8px; margin-left: 25px;">
                  <span style="font-size: 1.2rem;">📈</span> <span style="color: #111; font-weight: bold;">Reseller</span>
                </div>
              </div>
              <div style="padding: 10px 25px;">
                <img src="/box_2_example.png" alt="Reseller Box" style="width: 100%; border-radius: 8px; margin-bottom: 15px; object-fit: contain;" />
                <div style="font-size: 2.8rem; font-weight: 900; color: #E20074; line-height: 1; text-shadow: 0 0 15px rgba(226,0,116,0.3);">333 €</div>
                <div style="font-size: 1rem; color: #444; margin-top: 6px; font-weight: 600;">+ 25 € pauschaler Versand</div>
                <div style="font-size: 1.5rem; font-weight: bold; color: #111; margin-top: 10px;">Mehr Ware. Mehr Spielraum.</div>
              </div>
              <div style="margin: 0 25px 15px; padding: 12px; background: #333; border: 1px solid rgba(142,245,210,0.4); border-radius: 8px; text-align: center; box-shadow: inset 0 0 15px rgba(142,245,210,0.1), 0 5px 15px rgba(0,0,0,0.1);">
                <span style="display: block; color: #8EF5D2; font-weight: 900; font-size: 1.3rem; text-shadow: 0 0 15px rgba(142,245,210,0.8), 0 0 30px rgba(142,245,210,0.4);">Garantiert 690–750 € Warenwert</span>
                <span style="display: block; font-size: 0.9rem; color: #8EF5D2; margin-top: 4px; font-weight: bold; opacity: 0.8;">(Besserer Faktor: Mind. 230 € Wert pro 111 € Einsatz)</span>
              </div>
              <ul class="features-list" style="border-top: 1px solid #eee; padding-top: 20px; margin: 0 25px; flex-grow: 1; line-height: 1.5; font-size: 1.05rem; font-weight: 600;">
                <li style="margin-bottom: 12px; color: #333;"><span class="check" style="color: #E20074;">✓</span> Mehr Inhalt & größerer Mix</li>
                <li style="margin-bottom: 12px; color: #333;"><span class="check" style="color: #E20074;">✓</span> Mehr Verkaufspotenzial</li>
                <li style="color: #333;"><span class="check" style="color: #E20074;">✓</span> Für regelmäßige Verkäufer</li>
              </ul>
              <div class="card-footer" style="padding: 20px 25px;">
                <button class="btn-check" style="background: #E20074; width: 100%; border-radius: 6px; padding: 15px; color: white; font-weight: bold; font-size: 1.15rem; border: none; cursor: pointer; box-shadow: 0 5px 15px rgba(226,0,116,0.3);">Reseller wählen</button>
              </div>
            </div>

            <!-- CARD 3: Royale -->
            <div class="tariff-card" style="display: flex; flex-direction: column; position: relative; border: 2px solid #F4D068;">
              
              <!-- TOP RIGHT VIP RIBBON -->
              <div style="position: absolute; top: -20px; right: -20px; background: linear-gradient(135deg, #F4D068 0%, #E20074 100%); padding: 12px 20px; border-radius: 12px; color: white; box-shadow: 0 8px 25px rgba(226, 0, 116, 0.4); text-align: right; z-index: 10; transform: rotate(3deg);">
                <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 900; color: #fff; margin-bottom: 3px; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">Nur Hier Inklusive</div>
                <div style="font-weight: bold; font-size: 1.15rem; line-height: 1.2; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">VIP-Betreuung &<br/>Strategie-Call</div>
              </div>

              <div class="card-badge" style="background: #F4D068; color: #111; margin-right: auto; margin-left: 0;">BESTER DEAL</div>
              <div class="card-header" style="justify-content: flex-start; padding-bottom: 0;">
                <div class="tariff-title" style="font-size: 1.2rem; display: flex; align-items: center; gap: 8px; margin-left: 25px;">
                  <span style="font-size: 1.2rem;">💎</span> <span style="color: #111; font-weight: bold;">Royale</span>
                </div>
              </div>
              <div style="padding: 10px 25px;">
                <img src="/box_3_example.png" alt="Royale Box" style="width: 100%; border-radius: 8px; margin-bottom: 15px; object-fit: contain;" />
                <div style="font-size: 2.8rem; font-weight: 900; color: #F4D068; line-height: 1; text-shadow: 0 0 15px rgba(244,208,104,0.3);">999 €</div>
                <div style="font-size: 1rem; color: #444; margin-top: 6px; font-weight: 600;">+ 60 € pauschaler Versand</div>
                <div style="font-size: 1.5rem; font-weight: bold; color: #111; margin-top: 10px;">Die stärkste Box</div>
              </div>
              <div style="margin: 0 25px 15px; padding: 12px; background: #333; border: 1px solid rgba(142,245,210,0.4); border-radius: 8px; text-align: center; box-shadow: inset 0 0 15px rgba(142,245,210,0.1), 0 5px 15px rgba(0,0,0,0.1);">
                <span style="display: block; color: #8EF5D2; font-weight: 900; font-size: 1.3rem; text-shadow: 0 0 15px rgba(142,245,210,0.8), 0 0 30px rgba(142,245,210,0.4);">Garantiert 2.200–2.400 € Warenwert</span>
                <span style="display: block; font-size: 0.9rem; color: #8EF5D2; margin-top: 4px; font-weight: bold; opacity: 0.8;">(Maximaler Faktor: Mind. 245 € Wert pro 111 € Einsatz)</span>
              </div>
              <ul class="features-list" style="border-top: 1px solid #eee; padding-top: 20px; margin: 0 25px; flex-grow: 1; line-height: 1.5; font-size: 1.05rem; font-weight: 600;">
                <li style="margin-bottom: 12px; color: #333;"><span class="check" style="color: #E20074;">✓</span> Größter Warenmix</li>
                <li style="margin-bottom: 12px; color: #333;"><span class="check" style="color: #E20074;">✓</span> Maximales Potenzial</li>
                <li style="margin-bottom: 12px; color: #333;"><span class="check" style="color: #E20074;">✓</span> Inkl. Strategie-Call & Premium-Support</li>
                <li style="color: #333;"><span class="check" style="color: #E20074;">✓</span> Unlock: 1:1 Consulting (Diskreter Aufbau) zubuchbar</li>
              </ul>
              <div class="card-footer" style="padding: 20px 25px;">
                <button class="btn-check" style="background: linear-gradient(90deg, #F4D068, #E20074); width: 100%; border-radius: 6px; padding: 15px; color: white; font-weight: bold; font-size: 1.15rem; border: none; cursor: pointer; box-shadow: 0 5px 20px rgba(226,0,116,0.4);">Royale wählen</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- TESTIMONIALS SECTION -->
      <section class="testimonials-section">
        <div class="container">
          <div class="testi-eyebrow">Echte Erfahrungen</div>
          <h2 class="testi-heading">Was unsere Partner sagen</h2>

          <div class="testi-slider-wrapper">
            <div class="testi-fade testi-fade-left"></div>
            <div class="testi-fade testi-fade-right"></div>

            <div class="testi-track" :style="{ transform: `translateX(calc(-${sliderIndex * (100 / 3)}% - ${sliderIndex * 20 / 3}px))` }">
              <!-- 1 -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">„Ehrlich gesagt hab ich erstmal gezögert. 111€ für eine Box die ich gar nicht kenne? Aber irgendwas hat mich überzeugt. Die Ware war echt – innerhalb von 10 Tagen war fast alles weg, hab ungefähr 200€ rausgeholt. Dann sofort die 333er bestellt."</p>
                <div class="testi-author">
                  <div class="testi-avatar">MK</div>
                   <div><strong>Markus K.</strong><span>Dortmund · vor 3 Monaten</span></div>
                </div>
              </div>
              <!-- 2 -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">„Vielen Dank, alles hat geklappt! Box kam schnell, Ware war top. Mehr muss ich eigentlich nicht sagen."</p>
                <div class="testi-author">
                  <div class="testi-avatar">JW</div>
                   <div><strong>Jan W.</strong><span>Köln · vor 5 Wochen</span></div>
                </div>
              </div>
              <!-- 3 -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">„Royale Box – der Warenwert war sogar etwas über dem angegebenen. Das hab ich wirklich nicht erwartet. Der Strategie-Call danach hat mir sehr geholfen, mein Verkaufssystem diskreter aufzustellen. Wer viel verkauft weiß, warum das wichtig ist."</p>
                <div class="testi-author">
                  <div class="testi-avatar">TM</div>
                   <div><strong>Tobias M.</strong><span>Berlin · vor 6 Wochen</span></div>
                </div>
              </div>
              <!-- 4 – ehrlich: Versand etwas länger -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★☆</div>
                <p class="testi-text">„Hat 1-2 Tage länger gedauert als erwartet, aber okay – die Box kam an und der Inhalt hat mich wirklich überrascht. Markenware, ordentlich verpackt, nichts zu meckern. Beim nächsten Mal wieder."</p>
                <div class="testi-author">
                  <div class="testi-avatar">PS</div>
                   <div><strong>Pascal S.</strong><span>Stuttgart · vor 2 Monaten</span></div>
                </div>
              </div>
              <!-- 5 -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">„Ich bin eigentlich kein Mensch der viel online kauft – meine Tochter hat mich überredet. Ich muss sagen: die Pakete haben mich wirklich überrascht. Richtige Marken, und ich hab alles auf Kleinanzeigen sogar zum Wunschpreis verkauft. Das hat so keiner erwartet – auch ich nicht 😅"</p>
                <div class="testi-author">
                  <div class="testi-avatar">SL</div>
                   <div><strong>Sandra L.</strong><span>Leipzig · vor 4 Monaten</span></div>
                </div>
              </div>
              <!-- 6 – ehrlich: Versand 6 Werktage -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★☆</div>
                <p class="testi-text">„Versand war bei mir etwas langsamer, 6 Werktage. Hab kurz nachgefragt, wurde aber direkt geantwortet. Ware selbst: absolut top. Nike-Schuhe, ein paar Klamotten – alles original. Hab schon weiterverkauft."</p>
                <div class="testi-author">
                  <div class="testi-avatar">RB</div>
                   <div><strong>René B.</strong><span>Hamburg · vor 7 Wochen</span></div>
                </div>
              </div>
              <!-- 7 -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">„Ich hätte nicht gedacht dass das so einfach ist. Auspacken, fotografieren, listen – und die Sachen gehen weg. Keine große Vorbereitung nötig. Zweite Box ist schon unterwegs."</p>
                <div class="testi-author">
                  <div class="testi-avatar">NF</div>
                   <div><strong>Nina F.</strong><span>München · vor 1 Monat</span></div>
                </div>
              </div>
              <!-- 8 -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">„Das Konzept hat mich von Anfang an überzeugt. Bin mit der Starter angefangen, jetzt regelmäßig bei der Reseller. Macht einfach Sinn."</p>
                <div class="testi-author">
                  <div class="testi-avatar">DK</div>
                   <div><strong>Daniel K.</strong><span>Frankfurt · vor 5 Monaten</span></div>
                </div>
              </div>
              <!-- 9 -->
              <div class="testi-slide">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">„Kommunikation war super, Versand schnell, Ware wie beschrieben. Was will man mehr. Bin dabei geblieben und empfehle es auch weiter."</p>
                <div class="testi-author">
                  <div class="testi-avatar">LM</div>
                   <div><strong>Laura M.</strong><span>Hannover · vor 2 Monaten</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Dots -->
          <div class="testi-dots">
            <button v-for="(_, i) in 7" :key="i" class="testi-dot" :class="{ active: sliderIndex === i }" @click="sliderIndex = i"></button>
          </div>
        </div>
      </section>

      
<!-- INFO BANNER -->
      <section class="info-banner-section" style="margin-top: 40px; margin-bottom: 60px;">
        <div class="container">
          <div class="dark-box" style="background: #111; border-radius: 12px; padding: 30px; display: flex; align-items: center; gap: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div class="box-icon">
              <div class="magenta-circle" style="background: #E20074; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white;">💡</div>
            </div>
            <div class="box-text">
              <h3 style="color: white; margin-bottom: 8px; font-size: 1.4rem;">Noch unschlüssig oder offene Fragen?</h3>
              <p style="color: #bbb; font-size: 1rem; line-height: 1.5; margin: 0;">Kein Problem – erfahre hier mehr über unser einzigartiges Konzept, unsere Philosophie und warum Trustbox die cleverste und sicherste Art ist, extrem profitabel im E-Commerce durchzustarten.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- INFO CARDS & CONTACT -->
      <section class="info-cards-section" style="padding-bottom: 60px;">
        <div class="container">
          <div class="info-cards-grid" style="display: flex; flex-direction: column; gap: 30px; margin-bottom: 50px;">
            <div class="info-card" style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid rgba(226, 0, 116, 0.1);">
              <h4 style="color: #E20074; margin-bottom: 20px; font-size: 1.6rem; font-weight: 800;">Unsere Philosophie</h4>
              <div style="color: #444; line-height: 1.8; font-size: 1.05rem;">
                <strong>Unser Konzept ist einfach: Wir gewinnen nur, wenn du gewinnst.</strong><br/><br/>
                An einem einzelnen 111 € Paket ist für uns nicht viel verdient. Der eigentliche Wert entsteht woanders: Wenn du mit unserer Ware zufrieden bist, sie nutzen oder weiterverkaufen kannst und wieder zu uns zurückkommst.<br/><br/>
                Genau deshalb ist es nicht unser Ziel, dir irgendeinen Restposten-Schrott zu schicken. Das würde vielleicht einmal funktionieren — aber danach wäre dein Vertrauen weg, dein Geld verbrannt und unser gemeinsamer Weg beendet.<br/><br/>
                <strong>Wir denken anders.</strong><br/><br/>
                Wenn du mit deiner Box Gewinn machst, kommst du zurück. Wenn du zurückkommst, können wir größere Mengen einkaufen. Wenn wir größere Mengen einkaufen, werden unsere Einkaufspreise besser. Und wenn unsere Einkaufspreise besser werden, können wir diese Vorteile wieder an unsere Stammkunden weitergeben.<br/><br/>
                <strong>So entsteht ein echtes Win-Win-System.</strong><br/><br/>
                Je größer unsere Abnehmer-Community wird, desto stärker werden wir im Einkauf — ähnlich wie große Händler, die durch Masse bessere Preise bekommen. Nur dass wir diesen Vorteil nicht für uns allein behalten wollen, sondern mit den Menschen teilen, die mit uns wachsen.<br/><br/>
                Unsere wertvollsten Kunden sind nicht die, die einmal kaufen.<br/>
                Unsere wertvollsten Kunden sind die, die wiederkommen.<br/><br/>
                Darum liefern wir Ware, hinter der wir stehen. Ware mit echtem Wert. Ware, die du selbst nutzen oder privat weiterverkaufen kannst.<br/><br/>
                Du sollst mit deiner Box zufrieden sein.<br/>
                Du sollst wiederkommen.<br/>
                Und wir sollen gemeinsam wachsen.<br/><br/>
                <strong>Das ist Trustbox.</strong><br/>
                Keine Einbahnstraße. Eine Partnerschaft auf Augenhöhe.
              </div>
            </div>
            
            <div class="info-card" style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid rgba(226, 0, 116, 0.1);">
              <h4 style="color: #E20074; margin-bottom: 20px; font-size: 1.6rem; font-weight: 800;">Zahlungsmethoden</h4>
              <p style="color: #444; line-height: 1.8; font-size: 1.05rem; margin: 0;">
                Damit wir dir maximal günstige Preise bieten können, geben wir dir für Zahlungen über Kryptowährungen sogar noch einen leichten Rabatt. Wir unterstützen freie Zahlungsmethoden.<br/><br/>
                Solltest du uns noch nicht zu 100% vertrauen, kannst du bei deinen ersten Bestellungen gerne klassisch per Banküberweisung oder PayPal einkaufen.<br/><br/>
                <strong>Wir empfehlen jedoch langfristig auf Crypto (Stablecoin, Ethereum oder Bitcoin) umzusteigen.</strong>
              </p>
            </div>
          </div>

          <!-- MINI FAQ -->
          <div class="mini-faq">
            <h3 class="mini-faq-title">Häufige Fragen – direkt beantwortet</h3>
            <div class="mini-faq-grid">
              <div class="mini-faq-item">
                <div class="mini-faq-q">🛍️ Sind die Produkte wirklich original?</div>
                <div class="mini-faq-a">Ja – wir liefern ausschließlich geprüfte Originalware von echten Marken. Keine Kopien, keine Fakes. Das ist unser Versprechen.</div>
              </div>
              <div class="mini-faq-item">
                <div class="mini-faq-q">💰 Was wenn der Warenwert nicht stimmt?</div>
                <div class="mini-faq-a">Wir garantieren den zugesagten Warenwert (verglichen mit Amazon). Sollte er nicht passen, melden – wir klären das sofort.</div>
              </div>
              <div class="mini-faq-item">
                <div class="mini-faq-q">🚀 Kann ich die Ware wirklich verkaufen?</div>
                <div class="mini-faq-a">Absolut. Die Ware ist ideal für Vinted, Kleinanzeigen, eBay oder den Flohmarkt. Kein Händlerschein nötig – privater Verkauf ist erlaubt.</div>
              </div>
              <div class="mini-faq-item">
                <div class="mini-faq-q">📬 Wie schnell kommt meine Box?</div>
                <div class="mini-faq-a">In der Regel 3–5 Werktage nach Zahlungseingang. Wir versenden per DHL/DPD aus Deutschland.</div>
              </div>
              <div class="mini-faq-item">
                <div class="mini-faq-q">🔒 Wie läuft die Zahlung ab?</div>
                <div class="mini-faq-a">Sicher per PayPal (mit Käuferschutz), Banküberweisung oder Kryptowährung. Bei Crypto gibt es sogar leichten Rabatt.</div>
              </div>
              <div class="mini-faq-item">
                <div class="mini-faq-q">🤝 Was beinhaltet der Strategie-Call (Royale)?</div>
                <div class="mini-faq-a">1:1 Session mit uns: Verkaufsstrategie, Preisgestaltung, beste Plattformen für deinen Warentyp – individuell auf dich abgestimmt.</div>
              </div>
            </div>
          </div>

          <!-- CONTACT PROMPT -->
          <div class="contact-prompt">
            <div class="contact-icon">💬</div>
            <h3>Noch Fragen? Wir sind für dich da!</h3>
            <p>Schreib uns direkt – Antwort innerhalb von 1 Stunde.</p>
            <div class="contact-buttons">
              <a href="https://wa.me/491234567890?text=Hallo%20TrustBox%2C%20ich%20habe%20eine%20Frage%20zu%20euren%20Boxen" target="_blank" rel="noopener noreferrer" class="contact-btn whatsapp-btn" id="whatsapp-contact-btn">
                <svg viewBox="0 0 24 24" class="contact-btn-icon" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp schreiben
              </a>
              <a href="https://t.me/trustboxroyale" target="_blank" rel="noopener noreferrer" class="contact-btn telegram-btn" id="telegram-contact-btn">
                <svg viewBox="0 0 24 24" class="contact-btn-icon" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram schreiben
              </a>
              <a href="mailto:support@trustboxroyale.com" class="contact-btn email-btn" id="email-contact-btn">
                <svg viewBox="0 0 24 24" class="contact-btn-icon" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                E-Mail senden
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- WRITER SECTION -->
      <WriterSection />

      <!-- FINAL CTA -->
      <section class="final-cta-section text-center" style="margin: 80px 0;">
        <div class="container">
          <h2 style="font-size: 2.8rem; font-weight: 900; color: #111; margin-bottom: 20px;">Worauf wartest du?</h2>
          <p style="font-size: 1.3rem; color: #444; margin-bottom: 10px;">Je früher du startest,</p>
          <p style="font-size: 1.3rem; font-weight: bold; color: #E20074; margin-bottom: 30px;">desto früher kannst du deine erste Box verkaufen.</p>
          <div style="font-size: 3rem; margin-bottom: 40px; animation: floatDown 2s infinite;">👇</div>
          
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <a href="#tariffs" @click.prevent="scrollToTariffs" class="btn-check" style="background: #333; color: white; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 1.2rem; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">Starter</a>
            <a href="#tariffs" @click.prevent="scrollToTariffs" class="btn-check" style="background: #E20074; color: white; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 1.2rem; text-decoration: none; box-shadow: 0 4px 15px rgba(226,0,116,0.3);">Reseller</a>
            <a href="#tariffs" @click.prevent="scrollToTariffs" class="btn-check" style="background: linear-gradient(90deg, #F4D068, #E20074); color: white; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 1.2rem; text-decoration: none; box-shadow: 0 4px 15px rgba(226,0,116,0.3);">Royale</a>
          </div>
        </div>
      </section>

      <!-- FEATURES SECTION -->
      <section class="features-section">
        <div class="features-bg-wave"></div>
        <div class="container features-container">
          <div class="feature-col" style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid rgba(226, 0, 116, 0.1); display: flex; flex-direction: column;">
            <div style="font-size: 2.5rem; margin-bottom: 20px;">💎</div>
            <h3 style="color: #333;">Warum sich eine TrustBox lohnt</h3>
            <p style="flex-grow: 1; color: #555;">Wir achten bereits im Einkauf darauf, hochwertige Markenware mit echtem Weiterverkaufspotenzial zu sichern.<br/><br/>Unser Konzept funktioniert nur, wenn du zufrieden bist, Gewinn machen kannst und wiederkommst. Deshalb erhältst du geprüfte Markenware deutlich unter Vergleichswert.</p>
            <a href="#tariffs" @click.prevent="scrollToTariffs" class="btn-check" style="margin-top: auto; text-align: center; background: #E20074; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; text-decoration: none; box-shadow: 0 4px 15px rgba(226, 0, 116, 0.3);">Zu den Boxen</a>
          </div>
          <div class="feature-col" style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid rgba(226, 0, 116, 0.1); display: flex; flex-direction: column;">
            <div style="font-size: 2.5rem; margin-bottom: 20px;">📦</div>
            <h3 style="color: #333;">So entsteht dein Warenwert</h3>
            <p style="flex-grow: 1; color: #555;">Jede TrustBox wird nach Verfügbarkeit individuell zusammengestellt. Entscheidend ist nicht ein fester Inhalt, sondern echte Markenware und der zugesagte Warenwert.<br/><br/>So bekommst du Ware, die du selbst nutzen oder privat weiterverkaufen kannst.</p>
            <a href="#tariffs" @click.prevent="scrollToTariffs" class="btn-check" style="margin-top: auto; text-align: center; background: #E20074; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; text-decoration: none; box-shadow: 0 4px 15px rgba(226, 0, 116, 0.3);">Zu den Boxen</a>
          </div>
          <div class="feature-col" style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid rgba(226, 0, 116, 0.1); display: flex; flex-direction: column;">
            <div style="font-size: 2.5rem; margin-bottom: 20px;">🚀</div>
            <h3 style="color: #333;">Welche Box passt zu dir?</h3>
            <p style="flex-grow: 1; color: #555;">Starte mit der Starter Box, wenn du TrustBox erst einmal testen und Vertrauen sammeln möchtest.<br/><br/>Wähle die Reseller Box, wenn du mehr Ware und mehr Spielraum willst.<br/><br/>Die Royale Box ist für alle, die ernsthaft in den Weiterverkauf starten möchten — inklusive Strategie-Call und Premium-Support.</p>
            <a href="#tariffs" @click.prevent="scrollToTariffs" class="btn-check" style="margin-top: auto; text-align: center; background: #E20074; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; text-decoration: none; box-shadow: 0 4px 15px rgba(226, 0, 116, 0.3);">Boxen vergleichen</a>
          </div>
        </div>
      </section>

      <!-- STICKY CTA BUTTON -->
      <a href="#tariffs" @click.prevent="scrollToTariffs" class="sticky-cta">
        <span style="font-size: 1.2rem; margin-right: 8px;">📦</span> BOX BESTELLEN
      </a>

    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import WriterSection from '../Components/Writer/WriterSection.vue';

const scrollToTariffs = () => {
  const el = document.getElementById('tariffs');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Testimonial slider
const sliderIndex = ref(0);
let sliderInterval = null;
const TOTAL_SLIDES = 9;
const VISIBLE = 3;
const MAX_INDEX = TOTAL_SLIDES - VISIBLE; // 6

let timerInterval = null;

onMounted(() => {
  // Countdown timer – 3h 24min 17s from page load
  let totalSeconds = 3 * 3600 + 24 * 60 + 17;

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      return;
    }
    totalSeconds--;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const hEl = document.getElementById('timer-h');
    const mEl = document.getElementById('timer-m');
    const sEl = document.getElementById('timer-s');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }, 1000);

  // Slowly count down available slots
  let slots = 47;
  const slotsInterval = setInterval(() => {
    if (slots <= 30) { clearInterval(slotsInterval); return; }
    slots--;
    const el = document.getElementById('available-slots');
    if (el) el.textContent = slots;
  }, 45000);

  // Auto-advance testimonial slider
  sliderInterval = setInterval(() => {
    sliderIndex.value = sliderIndex.value >= MAX_INDEX ? 0 : sliderIndex.value + 1;
  }, 4500);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
  if (sliderInterval) clearInterval(sliderInterval);
});
</script>

<style scoped>
/* GENERAL VARIABLES & RESETS */
.partner-page {
  --magenta: #E20074;
  --dark-bg: #0F0514;
  --text-dark: #222222;
  --text-light: #E2D9F3;
  --bg-light: #F8F9FA;
  font-family: 'Century Gothic', Arial, sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

:deep(.page-wrapper) {
  padding-top: 0 !important;
}

/* HERO SECTION */
.hero-section {
  position: relative;
  background-color: var(--dark-bg);
  color: white;
  padding: 120px 20px 180px;
  text-align: center;
  overflow: hidden;
}
.hero-section::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -25%;
  width: 150%;
  height: 120px;
  background: var(--bg-light);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  z-index: 1;
}

.hero-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 200px;
  background: radial-gradient(ellipse at center, rgba(226,0,116,0.4) 0%, rgba(0,0,0,0) 70%);
  filter: blur(40px);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* Glassmorphism Panel */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4), 
    0 0 60px rgba(226, 0, 116, 0.15), 
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-radius: 28px;
  padding: 3rem 4rem;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero-content {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.magenta-text {
  color: var(--magenta);
}

.hero-pricing {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-name {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.plan-desc {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.price-display {
  display: flex;
  align-items: flex-start;
  color: var(--magenta);
  font-weight: bold;
  margin-bottom: 20px;
}

.price-symbol {
  font-size: 1.5rem;
  margin-top: 5px;
  margin-right: 2px;
}

.price-big {
  font-size: 5.5rem;
  line-height: 1;
  letter-spacing: -3px;
}

.price-currency {
  font-size: 2rem;
  margin-left: 5px;
  margin-top: 5px;
}

.price-month {
  font-size: 1.2rem;
  margin-top: 35px;
  margin-left: 5px;
  font-weight: normal;
  color: var(--magenta);
}

.btn-check-availability {
  color: #00A5D8;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-check-availability .arrow {
  font-size: 1.5rem;
  line-height: 1;
}

.hero-note {
  font-size: 0.8rem;
  color: #aaa;
}

/* MAGENTA BANNER */
.magenta-banner-container {
  max-width: 1000px;
  margin: -60px auto 40px;
  position: relative;
  z-index: 3;
  padding: 0 20px;
}

.magenta-banner {
  background: linear-gradient(135deg, var(--magenta) 0%, #A30054 100%);
  border-radius: 16px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(226,0,116,0.3);
  border: 1px solid rgba(255,255,255,0.2);
}

.banner-text {
  flex: 1;
  padding: 40px;
  color: white;
}

.banner-text h2 {
  font-size: 2.2rem;
  font-weight: 900;
  font-style: italic;
  line-height: 1.1;
  margin-bottom: 5px;
}

.banner-text p {
  font-size: 1.2rem;
  font-style: italic;
  font-weight: bold;
}

.banner-image {
  flex: 1.5;
  background-color: #333;
  background-image: url('/banner-profit.png');
  background-size: cover;
  background-position: center;
}

/* TARIFFS SECTION */
@keyframes floatDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(15px); }
}

.tariffs-section {
  padding: 20px 0 60px;
}

.tariffs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.tariff-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  padding: 25px 0 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.tariff-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(226,0,116,0.3);
  border-color: rgba(226,0,116,0.5);
}

.card-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 4px;
}

.blue-badge { background-color: #0077B5; }
.magenta-badge { background-color: var(--magenta); }

.card-highlighted {
  border: 2px solid var(--magenta);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(226,0,116,0.1);
}

.tariff-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.tariff-title span {
  color: #333;
}

.speed-main {
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.speed-main strong {
  font-size: 2.5rem;
  font-weight: 900;
}

.speed-sub {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 20px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.features-list li {
  font-size: 0.9rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.check {
  color: var(--magenta);
  margin-right: 8px;
  font-weight: bold;
}

.info-icon {
  font-size: 0.8rem;
  color: #999;
  margin-left: 5px;
  cursor: help;
}

.promo-tag {
  background-color: var(--magenta);
  color: white;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.pricing-details {
  margin-bottom: 15px;
}

.price-now {
  color: var(--magenta);
  font-size: 1rem;
}

.price-now strong {
  font-size: 1.5rem;
  font-weight: bold;
}

.price-later {
  font-size: 0.8rem;
  color: #666;
}

.cashback-box {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.cb-title {
  color: #009688;
  font-size: 0.95rem;
  margin-bottom: 5px;
}

.cb-title strong {
  font-size: 1.2rem;
}

.cb-desc {
  font-size: 0.75rem;
  color: #009688;
  line-height: 1.3;
}

.highlight {
  font-weight: bold;
}

.cashback-tag {
  background-color: rgba(226,0,116,0.1);
  color: var(--magenta);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.details-link, .pdf-link {
  color: #00A5D8;
  font-size: 0.8rem;
  text-decoration: none;
}

.details-link:hover, .pdf-link:hover {
  text-decoration: underline;
}

.btn-check {
  background: white;
  border: 1px solid #ccc;
  color: #333;
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

.btn-check:hover {
  background: #f4f4f4;
}

/* NO GLASFASER BANNER */
.no-glasfaser-section {
  padding: 0 0 60px;
}

.dark-box {
  background-color: #000;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.magenta-circle {
  width: 60px;
  height: 60px;
  background-color: var(--magenta);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.box-text h3 {
  color: var(--magenta);
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.box-text p {
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* INFO CARDS */
.info-cards-section {
  padding: 0 0 60px;
}

.info-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.info-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.info-card h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.info-card p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
}

.info-card a {
  color: #00A5D8;
  text-decoration: none;
}

/* FEATURES SECTION */
.features-section {
  background-color: transparent;
  color: var(--text-dark);
  position: relative;
  overflow: hidden;
  padding: 80px 0;
}

.features-bg-wave {
  position: absolute;
  top: 0; left: 0; right: 0; height: 100%;
  background: radial-gradient(ellipse at top right, rgba(226,0,116,0.3) 0%, transparent 60%);
  pointer-events: none;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
  z-index: 2;
}

.feature-col h3 {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 15px;
}

/* URGENCY BANNER */
.urgency-banner-section {
  padding: 16px 20px 0;
}
.urgency-banner {
  background: linear-gradient(135deg, #1a0a00 0%, #2d1000 100%);
  border: 1px solid rgba(255, 140, 0, 0.5);
  border-radius: 12px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(255, 100, 0, 0.2);
  flex-wrap: wrap;
}
.urgency-left {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #FFB347;
  font-size: 1rem;
  font-weight: 700;
}
.urgency-fire {
  font-size: 1.6rem;
  animation: fire-pulse 1s ease-in-out infinite alternate;
}
@keyframes fire-pulse {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}
.urgency-count {
  color: #FF6B00;
  font-size: 1.3rem;
  font-weight: 900;
}
.urgency-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.urgency-label {
  color: #aaa;
  font-size: 0.9rem;
  white-space: nowrap;
}
.urgency-timer {
  display: flex;
  align-items: center;
  gap: 6px;
}
.timer-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,140,0,0.3);
  border-radius: 8px;
  padding: 6px 10px;
  min-width: 48px;
}
.timer-block span {
  font-size: 1.4rem;
  font-weight: 900;
  color: #FF6B00;
  font-family: 'Century Gothic', monospace;
  line-height: 1;
}
.timer-block small {
  font-size: 0.65rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2px;
}
.timer-sep {
  color: #FF6B00;
  font-size: 1.3rem;
  font-weight: 900;
  margin-bottom: 12px;
}

/* TRUST BADGES */
.trust-badges-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 32px;
  padding: 20px 16px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}
.trust-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #444;
}
.trust-badge-icon {
  font-size: 1.2rem;
}
.trust-badge-logo {
  height: 20px;
  width: auto;
}

/* TESTIMONIALS */
.testimonials-section {
  padding: 60px 0 40px;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}
.section-eyebrow {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #E20074;
  margin-bottom: 10px;
}
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: #111;
  margin-bottom: 40px;
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) {
  .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 680px) {
  .testimonials-grid { grid-template-columns: 1fr; }
}
.testimonial-card {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.07);
  border: 1px solid rgba(226,0,116,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(226,0,116,0.15);
  border-color: rgba(226,0,116,0.3);
}
.testimonial-stars {
  color: #F4D068;
  font-size: 1.2rem;
  letter-spacing: 2px;
}
.testimonial-text {
  color: #333;
  font-size: 1rem;
  line-height: 1.7;
  font-style: italic;
  flex-grow: 1;
  margin: 0;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}
.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E20074, #A30054);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.testimonial-author strong {
  display: block;
  color: #111;
  font-size: 0.95rem;
}
.testimonial-author span {
  display: block;
  color: #888;
  font-size: 0.8rem;
  margin-top: 2px;
}

/* MINI FAQ */
.mini-faq {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  border: 1px solid rgba(226,0,116,0.1);
  margin-bottom: 40px;
}
.mini-faq-title {
  color: #E20074;
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 28px;
  text-align: center;
}
.mini-faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 768px) {
  .mini-faq-grid { grid-template-columns: 1fr; }
}
.mini-faq-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 3px solid #E20074;
  transition: background 0.2s;
}
.mini-faq-item:hover {
  background: rgba(226,0,116,0.04);
}
.mini-faq-q {
  font-weight: 800;
  color: #222;
  font-size: 0.95rem;
  margin-bottom: 8px;
}
.mini-faq-a {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* CONTACT PROMPT */
.contact-prompt {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(226,0,116,0.06) 0%, rgba(226,0,116,0.02) 100%);
  padding: 48px 40px;
  border-radius: 20px;
  border: 1px solid rgba(226,0,116,0.2);
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
}
.contact-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}
.contact-prompt h3 {
  color: #222;
  font-size: 1.7rem;
  font-weight: 900;
  margin-bottom: 10px;
}
.contact-prompt p {
  color: #666;
  font-size: 1rem;
  margin-bottom: 28px;
}
.contact-buttons {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}
.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.contact-btn-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
.whatsapp-btn {
  background: #25D366;
  color: #fff;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
}
.telegram-btn {
  background: #229ED9;
  color: #fff;
  box-shadow: 0 4px 15px rgba(34, 158, 217, 0.35);
}
.email-btn {
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

/* STICKY CTA */
.sticky-cta {
  position: fixed;
  right: 25px;
  bottom: 30px;
  background: linear-gradient(135deg, #E20074 0%, #A30054 100%);
  color: white;
  padding: 16px 28px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 1.15rem;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(226, 0, 116, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(255,255,255,0.2);
}
.sticky-cta:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 35px rgba(226, 0, 116, 0.6);
  color: white;
}
@media (max-width: 768px) {
  .sticky-cta {
    right: 15px;
    bottom: 20px;
    padding: 14px 22px;
    font-size: 1rem;
  }
}

.feature-col p {
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 30px;
}

.feature-col a {
  color: #00A5D8;
  text-decoration: none;
}

.btn-outline-dark {
  display: inline-block;
  border: 1px solid white;
  color: white !important;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-outline-dark:hover {
  background: white;
  color: #1A1A1A !important;
}

/* FAQ SECTION */
.faq-section {
  background-color: #1A1A1A;
  color: white;
  padding: 60px 0 100px;
}

.faq-section h2 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #333;
}

.faq-question {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;
}

.faq-arrow {
  color: #666;
}

/* MAGENTA FOOTER */
.magenta-footer {
  background-color: var(--magenta);
  color: white;
  padding: 60px 0;
  position: relative;
}

.magenta-footer h3 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: normal;
  margin-bottom: 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-col h4 {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 10px;
}

.footer-col a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-col a:hover {
  text-decoration: underline;
}

.chat-icon {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .tariffs-grid { grid-template-columns: repeat(2, 1fr); }
  .features-container { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .tariffs-grid { grid-template-columns: 1fr; }
  .magenta-banner { flex-direction: column; }
  .banner-image { height: 200px; }
  .info-cards-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .hero-content h1 { font-size: 2rem; }
  .price-big { font-size: 3.5rem; }
}

/* ===== PROOF SLIDER SECTION ===== */
.proof-slider-section {
  padding: 40px 0 60px;
  position: relative;
  z-index: 10;
}
.proof-title {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 2.5rem;
  color: #E20074;
  text-shadow: 0 0 15px rgba(226, 0, 116, 0.4);
  margin-bottom: 10px;
  text-align: center;
}
.proof-subtitle {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  text-align: center;
}

.marquee-wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 20px 0;
  display: flex;
}
.marquee-wrapper::before,
.marquee-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  width: 150px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.marquee-wrapper::before {
  left: 0;
  background: linear-gradient(to right, var(--bg-light), transparent);
}
.marquee-wrapper::after {
  right: 0;
  background: linear-gradient(to left, var(--bg-light), transparent);
}

.marquee-content {
  display: flex;
  gap: 30px;
  animation: marquee-scroll 30s linear infinite;
  padding-left: 30px;
}
.marquee-content:hover {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.proof-card {
  width: 320px;
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.proof-card:hover {
  transform: translateY(-10px);
  border-color: rgba(226, 0, 116, 0.3);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.proof-image-wrapper {
  width: 100%;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  background: #000;
  margin-bottom: 15px;
  position: relative;
}
.proof-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.proof-card:hover .proof-image {
  transform: scale(1.05);
}
.proof-info {
  text-align: center;
  width: 100%;
  padding-bottom: 5px;
}
.proof-info h4 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 1.8rem;
  color: var(--text-dark);
  margin: 0;
  text-shadow: none;
}

.hero-note {
  font-size: 1.1rem;
  color: var(--text-light);
}

.hero-glow-box:hover {
  background: rgba(226, 0, 116, 0.25) !important;
  box-shadow: 0 0 35px rgba(226, 0, 116, 0.6) !important;
  transform: translateY(-2px);
  border-color: #E20074 !important;
}
/* ===== TESTIMONIAL 3-CARD SLIDER ===== */
.testimonials-section {
  padding: 60px 0 50px;
  background: linear-gradient(180deg, #f5f5f8 0%, #fff 100%);
}
.testi-eyebrow {
  text-align: center;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #E20074;
  margin-bottom: 10px;
}
.testi-heading {
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: #111;
  margin-bottom: 40px;
}

.testi-slider-wrapper {
  position: relative;
  overflow: hidden;
  /* Show exactly 3 cards + gaps */
  max-width: 1100px;
  margin: 0 auto;
}

/* Fade edges */
.testi-fade {
  position: absolute;
  top: 0;
  width: 80px;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}
.testi-fade-left {
  left: 0;
  background: linear-gradient(to right, #f5f5f8, transparent);
}
.testi-fade-right {
  right: 0;
  background: linear-gradient(to left, #f5f5f8, transparent);
}

.testi-track {
  display: flex;
  gap: 20px;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px 4px 24px;
}

.testi-slide {
  /* Each card = exactly 1/3 of the 3-card view */
  flex: 0 0 calc((100% - 40px) / 3);
  background: #fff;
  border: 1px solid rgba(226,0,116,0.1);
  border-radius: 18px;
  padding: 24px 26px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  min-height: 200px;
}
.testi-slide:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 36px rgba(226,0,116,0.14);
  border-color: rgba(226,0,116,0.3);
}

.testi-stars {
  color: #F4D068;
  font-size: 1.1rem;
  letter-spacing: 2px;
}

.testi-text {
  color: #333;
  font-size: 0.93rem;
  line-height: 1.7;
  font-style: italic;
  margin: 0;
  flex-grow: 1;
}

.testi-author {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}
.testi-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E20074, #A30054);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.8rem;
  flex-shrink: 0;
}
.testi-author strong {
  display: block;
  color: #111;
  font-size: 0.88rem;
  font-style: normal;
}
.testi-author span {
  display: block;
  color: #999;
  font-size: 0.76rem;
  margin-top: 2px;
}

/* Dots */
.testi-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
}
.testi-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  padding: 0;
}
.testi-dot.active {
  background: #E20074;
  transform: scale(1.3);
}

/* Mobile: 1 card */
@media (max-width: 768px) {
  .testi-slide {
    flex: 0 0 100%;
  }
  .testi-track {
    gap: 0;
  }
  .testi-slider-wrapper {
    overflow: hidden;
  }
}
</style>
