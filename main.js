class PlanetAnnihilator {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    
    this.currentWeapon = 'rocket';
    this.currentPlanet = 'earth';
    this.gameMode = 'sandbox';
    
    this.planets = new Map();
    this.weapons = [];
    this.particles = [];
    this.projectiles = [];
    this.counterAttacks = [];
    
    this.mouse = { x: 0, y: 0, isDown: false };
    this.weaponCharge = 0;
    this.maxCharge = 100;
    this.isCharging = false;
    this.chargeStartTime = 0;
    
    this.initializePlanets();
    this.setupEventListeners();
    this.gameLoop();
  }
  
  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  initializePlanets() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    this.planets.set('earth', {
      name: '地球',
      x: centerX,
      y: centerY,
      radius: 120,
      shape: 'sphere',
      color: '#4a90e2',
      secondaryColor: '#2e7d32',
      tertiaryColor: '#1565c0',
      population: 7800000000,
      maxPopulation: 7800000000,
      species: '人类',
      civilization: 'II',
      cities: 12847,
      shield: 100,
      maxShield: 100,
      integrity: 100,
      atmosphere: 0.8,
      defenseType: 'magnetic',
      craters: [],
      continents: this.generateContinents(),
      defenseSystem: {
        type: 'storm',
        cooldown: 0,
        maxCooldown: 300
      }
    });
    
    this.planets.set('mars', {
      name: '火星',
      x: centerX,
      y: centerY,
      radius: 100,
      shape: 'sphere',
      color: '#d32f2f',
      secondaryColor: '#bf360c',
      tertiaryColor: '#8d1e1e',
      population: 2500000,
      maxPopulation: 2500000,
      species: '火星殖民者',
      civilization: 'I',
      cities: 47,
      shield: 60,
      maxShield: 60,
      integrity: 100,
      atmosphere: 0.1,
      defenseType: 'volcanic',
      craters: [],
      polarCaps: true,
      defenseSystem: {
        type: 'lava',
        cooldown: 0,
        maxCooldown: 200
      }
    });
    
    this.planets.set('venus', {
      name: '金星',
      x: centerX,
      y: centerY,
      radius: 115,
      shape: 'sphere',
      color: '#ffa726',
      secondaryColor: '#ff8f00',
      tertiaryColor: '#e65100',
      population: 0,
      maxPopulation: 0,
      species: '无',
      civilization: '0',
      cities: 0,
      shield: 150,
      maxShield: 150,
      integrity: 100,
      atmosphere: 2.0,
      defenseType: 'toxic',
      craters: [],
      cloudLayers: 3,
      defenseSystem: {
        type: 'acid',
        cooldown: 0,
        maxCooldown: 250
      }
    });
    
    this.planets.set('jupiter', {
      name: '木星',
      x: centerX,
      y: centerY,
      radius: 200,
      shape: 'gas_giant',
      color: '#ff7043',
      secondaryColor: '#d84315',
      tertiaryColor: '#bf360c',
      population: 0,
      maxPopulation: 0,
      species: '无',
      civilization: '0',
      cities: 0,
      shield: 300,
      maxShield: 300,
      integrity: 100,
      atmosphere: 5.0,
      defenseType: 'storm',
      craters: [],
      stormBands: 8,
      greatRedSpot: true,
      defenseSystem: {
        type: 'lightning',
        cooldown: 0,
        maxCooldown: 150
      }
    });
    
    this.planets.set('kepler', {
      name: '开普勒-442b',
      x: centerX,
      y: centerY,
      radius: 140,
      shape: 'super_earth',
      color: '#4caf50',
      secondaryColor: '#2e7d32',
      tertiaryColor: '#1b5e20',
      population: 15600000000,
      maxPopulation: 15600000000,
      species: '开普勒人',
      civilization: 'III',
      cities: 28934,
      shield: 200,
      maxShield: 200,
      integrity: 100,
      atmosphere: 1.2,
      defenseType: 'energy',
      craters: [],
      rings: false,
      defenseSystem: {
        type: 'plasma',
        cooldown: 0,
        maxCooldown: 180
      }
    });
    
    this.planets.set('titan', {
      name: '土卫六',
      x: centerX,
      y: centerY,
      radius: 90,
      shape: 'moon',
      color: '#ff9800',
      secondaryColor: '#f57c00',
      tertiaryColor: '#e65100',
      population: 890000,
      maxPopulation: 890000,
      species: '泰坦居民',
      civilization: 'I',
      cities: 23,
      shield: 80,
      maxShield: 80,
      integrity: 100,
      atmosphere: 1.5,
      defenseType: 'methane',
      craters: [],
      methaneLakes: true,
      defenseSystem: {
        type: 'hydrocarbon',
        cooldown: 0,
        maxCooldown: 220
      }
    });
    
    this.planets.set('proxima', {
      name: '比邻星b',
      x: centerX,
      y: centerY,
      radius: 110,
      shape: 'tidally_locked',
      color: '#e91e63',
      secondaryColor: '#ad1457',
      tertiaryColor: '#880e4f',
      population: 4200000000,
      maxPopulation: 4200000000,
      species: '比邻星人',
      civilization: 'II',
      cities: 8765,
      shield: 120,
      maxShield: 120,
      integrity: 100,
      atmosphere: 0.6,
      defenseType: 'radiation',
      craters: [],
      dayNightSide: true,
      defenseSystem: {
        type: 'stellar',
        cooldown: 0,
        maxCooldown: 160
      }
    });
    
    this.planets.set('crystalline', {
      name: '水晶星',
      x: centerX,
      y: centerY,
      radius: 130,
      shape: 'crystalline',
      color: '#9c27b0',
      secondaryColor: '#7b1fa2',
      tertiaryColor: '#4a148c',
      population: 890000000,
      maxPopulation: 890000000,
      species: '水晶生命体',
      civilization: 'IV',
      cities: 1247,
      shield: 400,
      maxShield: 400,
      integrity: 100,
      atmosphere: 0.3,
      defenseType: 'crystal',
      craters: [],
      crystalFormations: 12,
      defenseSystem: {
        type: 'resonance',
        cooldown: 0,
        maxCooldown: 120
      }
    });
  }
  
  generateContinents() {
    const continents = [];
    for (let i = 0; i < 7; i++) {
      continents.push({
        angle: (Math.PI * 2 / 7) * i + Math.random() * 0.5,
        size: 0.3 + Math.random() * 0.4,
        shape: Math.random() > 0.5 ? 'irregular' : 'elongated'
      });
    }
    return continents;
  }
  
  setupEventListeners() {
    // Weapon selection
    document.querySelectorAll('.weapon-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.weapon-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentWeapon = btn.dataset.weapon;
      });
    });
    
    // Planet selection
    document.querySelectorAll('.planet-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.planet-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentPlanet = btn.dataset.planet;
        this.updatePlanetInfo();
      });
    });
    
    // Game mode
    document.getElementById('mode-select').addEventListener('change', (e) => {
      this.gameMode = e.target.value;
    });
    
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.isDown = true;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.startWeaponActivation();
    });
    
    this.canvas.addEventListener('mouseup', (e) => {
      this.mouse.isDown = false;
      this.endWeaponActivation();
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.initializePlanets();
    });
  }
  
  startWeaponActivation() {
    const weaponConfig = this.getWeaponConfig(this.currentWeapon);
    const activation = weaponConfig.activation;
    
    switch (activation) {
      case 'instant':
        this.fireWeapon();
        break;
      case 'charge':
        this.isCharging = true;
        this.chargeStartTime = Date.now();
        this.weaponCharge = 0;
        break;
      case 'hold':
      case 'channel':
      case 'sustained':
        this.isCharging = true;
        this.chargeStartTime = Date.now();
        break;
      default:
        this.fireWeapon();
    }
  }
  
  endWeaponActivation() {
    const weaponConfig = this.getWeaponConfig(this.currentWeapon);
    const activation = weaponConfig.activation;
    
    switch (activation) {
      case 'charge':
        if (this.weaponCharge >= 30) {
          this.fireWeapon();
        }
        break;
      case 'hold':
      case 'channel':
      case 'sustained':
        if (this.isCharging) {
          this.fireWeapon();
        }
        break;
    }
    
    this.isCharging = false;
    this.weaponCharge = 0;
  }
  
  fireWeapon() {
    const planet = this.planets.get(this.currentPlanet);
    const weaponConfig = this.getWeaponConfig(this.currentWeapon);
    
    // Calculate damage based on charge
    let finalDamage = weaponConfig.damage;
    if (this.weaponCharge > 0) {
      finalDamage *= (1 + this.weaponCharge / 100);
    }
    
    const projectile = {
      id: Date.now() + Math.random(),
      type: this.currentWeapon,
      x: this.mouse.x,
      y: this.mouse.y,
      targetX: planet.x,
      targetY: planet.y,
      speed: weaponConfig.speed,
      damage: finalDamage,
      color: weaponConfig.color,
      trail: [],
      life: weaponConfig.life || 1000,
      special: weaponConfig.special || {},
      charge: this.weaponCharge
    };
    
    this.projectiles.push(projectile);
    this.createWeaponEffect(projectile);
    
    this.weaponCharge = 0;
    this.isCharging = false;
  }
  
  getWeaponConfig(weaponType) {
    const configs = {
      'rocket': {
        speed: 3,
        damage: 25,
        color: '#ff6b35',
        life: 2000,
        activation: 'click',
        special: { explosive: true, trailType: 'smoke' }
      },
      'guided-missile': {
        speed: 2,
        damage: 30,
        color: '#ff3333',
        life: 3000,
        activation: 'hold',
        special: { guided: true, trailType: 'fire' }
      },
      'laser': {
        speed: 15,
        damage: 15,
        color: '#00ff00',
        life: 100,
        activation: 'instant',
        special: { instant: true, penetrating: true }
      },
      'burst-laser': {
        speed: 12,
        damage: 40,
        color: '#ffff00',
        life: 200,
        activation: 'charge',
        special: { burst: true, explosive: true }
      },
      'super-laser': {
        speed: 20,
        damage: 80,
        color: '#ff00ff',
        life: 150,
        activation: 'channel',
        special: { piercing: true, shockwave: true }
      },
      'asteroid': {
        speed: 1.5,
        damage: 60,
        color: '#8b4513',
        life: 4000,
        activation: 'trajectory',
        special: { massive: true, gravity: true }
      },
      'bomb': {
        speed: 2.5,
        damage: 50,
        color: '#333333',
        life: 2500,
        activation: 'delay',
        special: { chainExplosion: true, area: true }
      },
      'black-hole': {
        speed: 1,
        damage: 100,
        color: '#000000',
        life: 5000,
        activation: 'sustained',
        special: { gravitational: true, absorption: true }
      },
      'railgun': {
        speed: 25,
        damage: 45,
        color: '#00ffff',
        life: 80,
        activation: 'precision',
        special: { electromagnetic: true, piercing: true }
      },
      'freeze-ray': {
        speed: 8,
        damage: 20,
        color: '#87ceeb',
        life: 1500,
        activation: 'sweep',
        special: { freezing: true, slowing: true }
      },
      'plasma-cannon': {
        speed: 6,
        damage: 70,
        color: '#ff4081',
        life: 1200,
        activation: 'burst',
        special: { plasma: true, melting: true }
      },
      'gravity-bomb': {
        speed: 1.8,
        damage: 90,
        color: '#673ab7',
        life: 3500,
        activation: 'orbital',
        special: { gravitational: true, implosion: true }
      },
      'nano-swarm': {
        speed: 4,
        damage: 35,
        color: '#607d8b',
        life: 2800,
        activation: 'spread',
        special: { swarm: true, adaptive: true }
      },
      'quantum-torpedo': {
        speed: 12,
        damage: 85,
        color: '#e1bee7',
        life: 1800,
        activation: 'phase',
        special: { quantum: true, phasing: true }
      },
      'solar-flare': {
        speed: 30,
        damage: 120,
        color: '#ffc107',
        life: 500,
        activation: 'solar',
        special: { stellar: true, radiation: true }
      },
      'void-lance': {
        speed: 40,
        damage: 150,
        color: '#1a1a1a',
        life: 300,
        activation: 'pierce',
        special: { void: true, reality_tear: true }
      }
    };
    
    return configs[weaponType] || configs['rocket'];
  }
  
  createWeaponEffect(projectile) {
    // Create initial firing effect
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x: projectile.x + (Math.random() - 0.5) * 20,
        y: projectile.y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        color: projectile.color,
        size: 2 + Math.random() * 3,
        type: 'muzzle'
      });
    }
  }
  
  updateProjectiles() {
    this.projectiles = this.projectiles.filter(projectile => {
      const planet = this.planets.get(this.currentPlanet);
      
      // Update position
      if (projectile.special.guided) {
        // Guided missile behavior
        const dx = planet.x - projectile.x;
        const dy = planet.y - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          projectile.x += (dx / distance) * projectile.speed;
          projectile.y += (dy / distance) * projectile.speed;
        }
      } else if (projectile.special.instant) {
        // Laser - instant hit
        projectile.x = planet.x;
        projectile.y = planet.y;
      } else {
        // Normal projectile
        const dx = projectile.targetX - projectile.x;
        const dy = projectile.targetY - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          projectile.x += (dx / distance) * projectile.speed;
          projectile.y += (dy / distance) * projectile.speed;
        }
      }
      
      // Add to trail
      projectile.trail.push({ x: projectile.x, y: projectile.y });
      if (projectile.trail.length > 20) {
        projectile.trail.shift();
      }
      
      // Check collision with planet
      const distToPlanet = Math.sqrt(
        (projectile.x - planet.x) ** 2 + (projectile.y - planet.y) ** 2
      );
      
      if (distToPlanet <= planet.radius + 10) {
        this.handleWeaponImpact(projectile, planet);
        return false; // Remove projectile
      }
      
      // Check life
      projectile.life--;
      return projectile.life > 0;
    });
  }
  
  handleWeaponImpact(projectile, planet) {
    // Check shield interaction
    if (planet.shield > 0) {
      const shieldAbsorption = Math.min(planet.shield, projectile.damage * 0.7);
      planet.shield -= shieldAbsorption;
      projectile.damage -= shieldAbsorption;
      
      // Shield visual effect
      this.createShieldEffect(planet, projectile);
      
      // Some weapons bounce off shields
      if (projectile.special.guided && planet.shield > 0) {
        this.createShieldDeflection(projectile, planet);
        return;
      }
    }
    
    // Apply damage
    if (projectile.damage > 0) {
      planet.integrity -= projectile.damage / 10;
      planet.population = Math.max(0, planet.population - (projectile.damage * 100000000));
      
      // Create crater
      this.createCrater(planet, projectile);
      
      // Create impact effects
      this.createImpactEffect(projectile, planet);
      
      // Trigger planet defense
      this.triggerPlanetDefense(planet, projectile);
    }
    
    this.updatePlanetInfo();
  }
  
  createShieldEffect(planet, projectile) {
    // Shield spark effects
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x: projectile.x + (Math.random() - 0.5) * 30,
        y: projectile.y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 20 + Math.random() * 15,
        maxLife: 35,
        color: '#00ffff',
        size: 1 + Math.random() * 2,
        type: 'shield'
      });
    }
  }
  
  createCrater(planet, projectile) {
    const angle = Math.atan2(projectile.y - planet.y, projectile.x - planet.x);
    const craterSize = projectile.damage / 5;
    
    planet.craters.push({
      angle: angle,
      size: craterSize,
      depth: projectile.damage / 10,
      type: projectile.type
    });
  }
  
  createImpactEffect(projectile, planet) {
    const effectCount = projectile.special.explosive ? 30 : 15;
    const effectType = this.getEffectType(projectile.type);
    
    for (let i = 0; i < effectCount; i++) {
      this.particles.push({
        x: projectile.x + (Math.random() - 0.5) * 40,
        y: projectile.y + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        life: 40 + Math.random() * 30,
        maxLife: 70,
        color: this.getEffectColor(effectType),
        size: 2 + Math.random() * 4,
        type: effectType
      });
    }
    
    // Special weapon effects
    if (projectile.special.chainExplosion) {
      this.createChainExplosion(projectile, planet);
    }
    
    if (projectile.special.freezing) {
      this.createFreezeEffect(projectile, planet);
    }
    
    if (projectile.special.shockwave) {
      this.createShockwave(projectile, planet);
    }
  }
  
  getEffectType(weaponType) {
    const effects = {
      'rocket': 'explosion',
      'guided-missile': 'explosion',
      'laser': 'burn',
      'burst-laser': 'energy',
      'super-laser': 'plasma',
      'asteroid': 'debris',
      'bomb': 'explosion',
      'black-hole': 'void',
      'railgun': 'electric',
      'freeze-ray': 'ice'
    };
    
    return effects[weaponType] || 'explosion';
  }
  
  getEffectColor(effectType) {
    const colors = {
      'explosion': '#ff6b35',
      'burn': '#ff4444',
      'energy': '#ffff00',
      'plasma': '#ff00ff',
      'debris': '#8b4513',
      'void': '#000000',
      'electric': '#00ffff',
      'ice': '#87ceeb'
    };
    
    return colors[effectType] || '#ff6b35';
  }
  
  createChainExplosion(projectile, planet) {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 / 3) * i;
        const distance = 50 + Math.random() * 30;
        const x = projectile.x + Math.cos(angle) * distance;
        const y = projectile.y + Math.sin(angle) * distance;
        
        for (let j = 0; j < 20; j++) {
          this.particles.push({
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 30 + Math.random() * 20,
            maxLife: 50,
            color: '#ff3333',
            size: 2 + Math.random() * 3,
            type: 'explosion'
          });
        }
      }
    }, 200);
  }
  
  createFreezeEffect(projectile, planet) {
    for (let i = 0; i < 25; i++) {
      this.particles.push({
        x: projectile.x + (Math.random() - 0.5) * 60,
        y: projectile.y + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 60 + Math.random() * 40,
        maxLife: 100,
        color: '#87ceeb',
        size: 3 + Math.random() * 5,
        type: 'ice'
      });
    }
  }
  
  createShockwave(projectile, planet) {
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 / 50) * i;
      const speed = 8 + Math.random() * 4;
      
      this.particles.push({
        x: projectile.x,
        y: projectile.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 40 + Math.random() * 20,
        maxLife: 60,
        color: '#ff00ff',
        size: 1 + Math.random() * 2,
        type: 'shockwave'
      });
    }
  }
  
  triggerPlanetDefense(planet, projectile) {
    if (planet.defenseSystem.cooldown > 0) return;
    
    planet.defenseSystem.cooldown = planet.defenseSystem.maxCooldown;
    
    // Show warning
    this.showWarning(`${planet.name} 正在反击！`);
    
    // Create counter-attack based on planet type
    setTimeout(() => {
      this.createCounterAttack(planet, projectile);
    }, 1000);
  }
  
  createCounterAttack(planet, originalProjectile) {
    const attackType = planet.defenseSystem.type;
    
    switch (attackType) {
      case 'storm':
        this.createStormAttack(planet);
        break;
      case 'lava':
        this.createLavaAttack(planet);
        break;
      case 'acid':
        this.createAcidAttack(planet);
        break;
      case 'lightning':
        this.createLightningAttack(planet);
        break;
    }
  }
  
  createStormAttack(planet) {
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i + Math.random() * 0.5;
      const distance = planet.radius + 50;
      
      this.counterAttacks.push({
        x: planet.x + Math.cos(angle) * distance,
        y: planet.y + Math.sin(angle) * distance,
        vx: Math.cos(angle) * 3,
        vy: Math.sin(angle) * 3,
        life: 200,
        maxLife: 200,
        damage: 15,
        color: '#666666',
        size: 8,
        type: 'debris'
      });
    }
  }
  
  createLavaAttack(planet) {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = planet.radius + 30;
      
      this.counterAttacks.push({
        x: planet.x + Math.cos(angle) * distance,
        y: planet.y + Math.sin(angle) * distance,
        vx: Math.cos(angle) * 4,
        vy: Math.sin(angle) * 4,
        life: 150,
        maxLife: 150,
        damage: 20,
        color: '#ff4500',
        size: 6,
        type: 'lava'
      });
    }
  }
  
  createAcidAttack(planet) {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = planet.radius + 40;
      
      this.counterAttacks.push({
        x: planet.x + Math.cos(angle) * distance,
        y: planet.y + Math.sin(angle) * distance,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        life: 300,
        maxLife: 300,
        damage: 10,
        color: '#90ee90',
        size: 4,
        type: 'acid'
      });
    }
  }
  
  createLightningAttack(planet) {
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = planet.radius + 100;
      
      this.counterAttacks.push({
        x: planet.x + Math.cos(angle) * distance,
        y: planet.y + Math.sin(angle) * distance,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8,
        life: 60,
        maxLife: 60,
        damage: 35,
        color: '#ffff00',
        size: 3,
        type: 'lightning'
      });
    }
  }
  
  updateCounterAttacks() {
    this.counterAttacks = this.counterAttacks.filter(attack => {
      attack.x += attack.vx;
      attack.y += attack.vy;
      attack.life--;
      
      // Create trail particles
      this.particles.push({
        x: attack.x + (Math.random() - 0.5) * 10,
        y: attack.y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 20,
        maxLife: 20,
        color: attack.color,
        size: attack.size / 2,
        type: attack.type
      });
      
      return attack.life > 0;
    });
  }
  
  updateParticles() {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      
      // Apply gravity for debris
      if (particle.type === 'debris') {
        particle.vy += 0.1;
      }
      
      // Fade particles
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      return particle.life > 0;
    });
  }
  
  updatePlanetSystems() {
    this.planets.forEach(planet => {
      // Regenerate shield slowly
      if (planet.shield < planet.maxShield) {
        planet.shield += 0.1;
      }
      
      // Reduce defense cooldown
      if (planet.defenseSystem.cooldown > 0) {
        planet.defenseSystem.cooldown--;
      }
    });
  }
  
  showWarning(message) {
    const warningDiv = document.createElement('div');
    warningDiv.className = 'warning-message';
    warningDiv.textContent = message;
    
    document.getElementById('warning-system').appendChild(warningDiv);
    
    setTimeout(() => {
      warningDiv.remove();
    }, 2000);
  }
  
  updatePlanetInfo() {
    const planet = this.planets.get(this.currentPlanet);
    
    document.getElementById('population').textContent = 
      planet.population > 1000000000 ? 
      (planet.population / 1000000000).toFixed(1) + 'B' :
      planet.population > 1000000 ?
      (planet.population / 1000000).toFixed(1) + 'M' :
      planet.population.toLocaleString();
    
    document.getElementById('species').textContent = planet.species;
    document.getElementById('civilization').textContent = planet.civilization;
    document.getElementById('cities').textContent = planet.cities.toLocaleString();
    
    document.getElementById('shield-fill').style.width = 
      `${(planet.shield / planet.maxShield) * 100}%`;
    
    document.getElementById('integrity').textContent = 
      `${Math.max(0, planet.integrity).toFixed(1)}%`;
  }
  
  updateWeaponCharge() {
    if (this.isCharging) {
      const elapsed = Date.now() - this.chargeStartTime;
      const weaponConfig = this.getWeaponConfig(this.currentWeapon);
      
      switch (weaponConfig.activation) {
        case 'charge':
          this.weaponCharge = Math.min(100, (elapsed / 20));
          document.getElementById('charge-text').textContent = '充能中...';
          break;
        case 'hold':
          this.weaponCharge = Math.min(100, (elapsed / 30));
          document.getElementById('charge-text').textContent = '蓄力中...';
          break;
        case 'channel':
          this.weaponCharge = Math.min(100, (elapsed / 25));
          document.getElementById('charge-text').textContent = '引导中...';
          break;
        case 'sustained':
          this.weaponCharge = Math.min(100, (elapsed / 40));
          document.getElementById('charge-text').textContent = '维持中...';
          break;
      }
      
      document.getElementById('charge-fill').style.width = `${this.weaponCharge}%`;
    } else {
      document.getElementById('charge-fill').style.width = '0%';
      document.getElementById('charge-text').textContent = '准备就绪';
    }
  }
  
  render() {
    // Clear canvas
    this.ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stars
    this.drawStars();
    
    // Draw planet
    this.drawPlanet();
    
    // Draw projectiles
    this.drawProjectiles();
    
    // Draw counter attacks
    this.drawCounterAttacks();
    
    // Draw particles
    this.drawParticles();
    
    // Draw shield if active
    this.drawShield();
  }
  
  drawStars() {
    this.ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = (i * 137.5) % this.canvas.width;
      const y = (i * 197.3) % this.canvas.height;
      const size = Math.sin(i) * 0.5 + 0.5;
      
      this.ctx.globalAlpha = size;
      this.ctx.fillRect(x, y, 1, 1);
    }
    this.ctx.globalAlpha = 1;
  }
  
  drawPlanet() {
    const planet = this.planets.get(this.currentPlanet);
    
    // Planet shadow
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.beginPath();
    this.ctx.arc(planet.x + 5, planet.y + 5, planet.radius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Draw planet based on shape
    this.drawPlanetShape(planet);
    
    // Draw special features
    this.drawPlanetFeatures(planet);
    
    // Draw craters
    this.drawCraters(planet);
    
    // Atmosphere
    if (planet.atmosphere > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = planet.atmosphere * 0.3;
      this.ctx.strokeStyle = planet.color;
      this.ctx.lineWidth = planet.atmosphere * 10;
      this.ctx.beginPath();
      this.ctx.arc(planet.x, planet.y, planet.radius + planet.atmosphere * 5, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
    
    this.ctx.restore();
  }
  
  drawPlanetShape(planet) {
    this.ctx.save();
    
    switch (planet.shape) {
      case 'sphere':
        this.drawSpherePlanet(planet);
        break;
      case 'gas_giant':
        this.drawGasGiant(planet);
        break;
      case 'super_earth':
        this.drawSuperEarth(planet);
        break;
      case 'moon':
        this.drawMoon(planet);
        break;
      case 'tidally_locked':
        this.drawTidallyLocked(planet);
        break;
      case 'crystalline':
        this.drawCrystalline(planet);
        break;
      default:
        this.drawSpherePlanet(planet);
    }
    
    this.ctx.restore();
  }
  
  drawSpherePlanet(planet) {
    const gradient = this.ctx.createRadialGradient(
      planet.x - planet.radius * 0.3, planet.y - planet.radius * 0.3, 0,
      planet.x, planet.y, planet.radius
    );
    gradient.addColorStop(0, planet.color);
    gradient.addColorStop(0.7, planet.secondaryColor);
    gradient.addColorStop(1, planet.tertiaryColor || '#000000');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawGasGiant(planet) {
    // Draw storm bands
    for (let i = 0; i < planet.stormBands; i++) {
      const bandY = planet.y - planet.radius + (planet.radius * 2 / planet.stormBands) * i;
      const bandHeight = planet.radius * 2 / planet.stormBands;
      
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
      this.ctx.clip();
      
      const bandGradient = this.ctx.createLinearGradient(0, bandY, 0, bandY + bandHeight);
      const intensity = Math.sin(i * 0.5) * 0.3 + 0.7;
      bandGradient.addColorStop(0, this.adjustColor(planet.color, intensity));
      bandGradient.addColorStop(1, this.adjustColor(planet.secondaryColor, intensity));
      
      this.ctx.fillStyle = bandGradient;
      this.ctx.fillRect(planet.x - planet.radius, bandY, planet.radius * 2, bandHeight);
      this.ctx.restore();
    }
    
    // Great Red Spot
    if (planet.greatRedSpot) {
      this.ctx.fillStyle = '#cc0000';
      this.ctx.beginPath();
      this.ctx.ellipse(planet.x + planet.radius * 0.3, planet.y, planet.radius * 0.3, planet.radius * 0.15, 0, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  drawSuperEarth(planet) {
    this.drawSpherePlanet(planet);
    
    // Draw continents
    if (planet.continents) {
      planet.continents.forEach(continent => {
        const x = planet.x + Math.cos(continent.angle) * planet.radius * 0.7;
        const y = planet.y + Math.sin(continent.angle) * planet.radius * 0.7;
        
        this.ctx.fillStyle = planet.tertiaryColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, planet.radius * continent.size * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
      });
    }
  }
  
  drawMoon(planet) {
    this.drawSpherePlanet(planet);
    
    // Add more craters for moon appearance
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i;
      const x = planet.x + Math.cos(angle) * planet.radius * 0.6;
      const y = planet.y + Math.sin(angle) * planet.radius * 0.6;
      
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      this.ctx.beginPath();
      this.ctx.arc(x, y, planet.radius * 0.1, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  drawTidallyLocked(planet) {
    // Day side
    const dayGradient = this.ctx.createRadialGradient(
      planet.x - planet.radius * 0.5, planet.y, 0,
      planet.x, planet.y, planet.radius
    );
    dayGradient.addColorStop(0, planet.color);
    dayGradient.addColorStop(1, planet.secondaryColor);
    
    this.ctx.fillStyle = dayGradient;
    this.ctx.beginPath();
    this.ctx.arc(planet.x, planet.y, planet.radius, -Math.PI/2, Math.PI/2);
    this.ctx.fill();
    
    // Night side
    const nightGradient = this.ctx.createRadialGradient(
      planet.x + planet.radius * 0.5, planet.y, 0,
      planet.x, planet.y, planet.radius
    );
    nightGradient.addColorStop(0, '#000000');
    nightGradient.addColorStop(1, planet.tertiaryColor);
    
    this.ctx.fillStyle = nightGradient;
    this.ctx.beginPath();
    this.ctx.arc(planet.x, planet.y, planet.radius, Math.PI/2, -Math.PI/2);
    this.ctx.fill();
  }
  
  drawCrystalline(planet) {
    // Base crystal structure
    this.ctx.fillStyle = planet.color;
    this.ctx.beginPath();
    
    const sides = 8;
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 / sides) * i;
      const x = planet.x + Math.cos(angle) * planet.radius;
      const y = planet.y + Math.sin(angle) * planet.radius;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
    
    // Crystal formations
    for (let i = 0; i < planet.crystalFormations; i++) {
      const angle = (Math.PI * 2 / planet.crystalFormations) * i;
      const x = planet.x + Math.cos(angle) * planet.radius * 0.8;
      const y = planet.y + Math.sin(angle) * planet.radius * 0.8;
      
      this.ctx.fillStyle = planet.secondaryColor;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + Math.cos(angle) * 20, y + Math.sin(angle) * 20);
      this.ctx.lineTo(x + Math.cos(angle + 0.5) * 15, y + Math.sin(angle + 0.5) * 15);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
  
  drawPlanetFeatures(planet) {
    // Polar caps for Mars
    if (planet.polarCaps) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(planet.x, planet.y - planet.radius * 0.8, planet.radius * 0.2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(planet.x, planet.y + planet.radius * 0.8, planet.radius * 0.15, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Cloud layers for Venus
    if (planet.cloudLayers) {
      for (let i = 0; i < planet.cloudLayers; i++) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.3;
        this.ctx.strokeStyle = '#ffff99';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(planet.x, planet.y, planet.radius + i * 8, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();
      }
    }
    
    // Methane lakes for Titan
    if (planet.methaneLakes) {
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i;
        const x = planet.x + Math.cos(angle) * planet.radius * 0.6;
        const y = planet.y + Math.sin(angle) * planet.radius * 0.6;
        
        this.ctx.fillStyle = '#003366';
        this.ctx.beginPath();
        this.ctx.arc(x, y, planet.radius * 0.15, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }
  
  adjustColor(color, intensity) {
    // Simple color adjustment function
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    return `rgb(${Math.floor(r * intensity)}, ${Math.floor(g * intensity)}, ${Math.floor(b * intensity)})`;
  }
  
  drawCraters(planet) {
    this.ctx.save();
    planet.craters.forEach(crater => {
      const x = planet.x + Math.cos(crater.angle) * (planet.radius - crater.depth);
      const y = planet.y + Math.sin(crater.angle) * (planet.radius - crater.depth);
      
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      this.ctx.beginPath();
      this.ctx.arc(x, y, crater.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Crater rim
      this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.8)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
    this.ctx.restore();
  }
  
  drawShield() {
    const planet = this.planets.get(this.currentPlanet);
    
    if (planet.shield > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = (planet.shield / planet.maxShield) * 0.5;
      this.ctx.strokeStyle = '#00ffff';
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([10, 5]);
      this.ctx.beginPath();
      this.ctx.arc(planet.x, planet.y, planet.radius + 20, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }
  
  drawProjectiles() {
    this.projectiles.forEach(projectile => {
      // Draw trail
      if (projectile.trail.length > 1) {
        this.ctx.save();
        this.ctx.strokeStyle = projectile.color;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.7;
        this.ctx.beginPath();
        this.ctx.moveTo(projectile.trail[0].x, projectile.trail[0].y);
        
        for (let i = 1; i < projectile.trail.length; i++) {
          this.ctx.lineTo(projectile.trail[i].x, projectile.trail[i].y);
        }
        this.ctx.stroke();
        this.ctx.restore();
      }
      
      // Draw projectile
      this.ctx.save();
      this.ctx.fillStyle = projectile.color;
      this.ctx.shadowColor = projectile.color;
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(projectile.x, projectile.y, 4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  drawCounterAttacks() {
    this.counterAttacks.forEach(attack => {
      this.ctx.save();
      this.ctx.fillStyle = attack.color;
      this.ctx.shadowColor = attack.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(attack.x, attack.y, attack.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life / particle.maxLife;
      this.ctx.fillStyle = particle.color;
      
      if (particle.type === 'shield') {
        this.ctx.shadowColor = particle.color;
        this.ctx.shadowBlur = 5;
      }
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  gameLoop() {
    this.updateProjectiles();
    this.updateCounterAttacks();
    this.updateParticles();
    this.updatePlanetSystems();
    this.updateWeaponCharge();
    this.render();
    
    requestAnimationFrame(() => this.gameLoop());
  }
}

// Initialize game when page loads
window.addEventListener('load', () => {
  new PlanetAnnihilator();
});
