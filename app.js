/**
 * APNA SHINWARI PAK-IND RESTAURANT - FRONT-END INTERACTION CONTROLLER
 * High-performance, zero-dependency interactive script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State & Elements
  const header = document.querySelector('.site-header');
  const navMenu = document.querySelector('.nav-menu');
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const backToTop = document.querySelector('.back-to-top');
  const cartToggle = document.querySelector('.cart-toggle-btn');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartItemsList = document.querySelector('.cart-items-list');
  const cartSubtotalEl = document.querySelector('.cart-subtotal-val');
  const cartBadge = document.querySelector('.cart-count-badge');
  const toast = document.querySelector('.toast-notice');

  // Cart state initialized with signature dish from menu
  let cart = [
    { id: 'dish-karahi-pollo', title: '66- Karahi de Pollo 1KG Deshuesado (Con 4 Naan)', price: 29.99, qty: 1 }
  ];

  // Helper function for Euro formatting
  function formatPrice(num) {
    return num.toFixed(2).replace('.', ',') + '€';
  }

  // 2. Sticky Navigation & Scroll Spy
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Sticky header
    if (scrollY > 70) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Scrollspy navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Smooth scroll for nav links & anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // Mobile menu toggle & backdrop controller
  const navBackdrop = document.getElementById('nav-backdrop');

  function openMobileMenu() {
    cartDrawer?.classList.remove('is-open');
    navMenu?.classList.add('is-active');
    mobileToggle?.classList.add('is-active');
    navBackdrop?.classList.add('is-active');
    document.body.classList.add('no-scroll');
  }

  function closeMobileMenu() {
    navMenu?.classList.remove('is-active');
    mobileToggle?.classList.remove('is-active');
    navBackdrop?.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('is-active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  navBackdrop?.addEventListener('click', closeMobileMenu);

  // Close mobile menu on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeModal();
    }
  });

  // 3. Featured Dishes Carousel (3-dish spotlight from flyer)
  const spotlightDishes = [
    {
      id: 'dish-karahi-pollo',
      name: '66- Karahi de Pollo 1KG Deshuesado',
      price: '29,99€',
      numericPrice: 29.99,
      image: 'assets/spotlight_karahi_pollo.png',
      badge: 'Oferta Especial',
      desc: '1KG de pollo deshuesado cocinado a fuego vivo en wok karahi tradicional con tomate natural, jengibre fresco, chile verde y especias selectas. Incluye 4 panes Naan recién horneados.'
    },
    {
      id: 'dish-karahi-cordero',
      name: '67- Cordero Karahi 1KG',
      price: '39,99€',
      numericPrice: 39.99,
      image: 'assets/spotlight_karahi_cordero.png',
      badge: 'Shinwari Especial',
      desc: 'Auténtico cordero estilo Shinwari preparado al momento en karahi con sus propios jugos, especias enteras y 4 panes Naan calientes.'
    },
    {
      id: 'dish-biryani-pollo',
      name: '48- Pollo Biryani Especial',
      price: '9,99€',
      numericPrice: 9.99,
      image: 'assets/spotlight_biryani.png',
      badge: 'Popular Biryani',
      desc: 'Arroz basmati aromático preparado con pollo marinado, cilantro fresco, azafrán y especias tradicionales al vapor en olla sellada.'
    }
  ];

  let centerDishIdx = 0; // Current center dish index

  function updateFeaturedCarousel() {
    const total = spotlightDishes.length;
    const leftIdx = (centerDishIdx - 1 + total) % total;
    const rightIdx = (centerDishIdx + 1) % total;

    const leftDish = spotlightDishes[leftIdx];
    const centerDish = spotlightDishes[centerDishIdx];
    const rightDish = spotlightDishes[rightIdx];

    // Left card
    const leftCard = document.getElementById('spotlight-left');
    if (leftCard) {
      leftCard.querySelector('img').src = leftDish.image;
      leftCard.querySelector('img').alt = leftDish.name;
      leftCard.querySelector('.dish-name').textContent = leftDish.name;
      leftCard.querySelector('.dish-price').textContent = leftDish.price;
      leftCard.dataset.dishId = leftDish.id;
    }

    // Center card
    const centerCard = document.getElementById('spotlight-center');
    if (centerCard) {
      centerCard.querySelector('img').src = centerDish.image;
      centerCard.querySelector('img').alt = centerDish.name;
      centerCard.querySelector('.dish-name').textContent = centerDish.name;
      centerCard.querySelector('.dish-price').textContent = centerDish.price;
      centerCard.querySelector('.dish-desc-preview').textContent = centerDish.desc;
      centerCard.querySelector('.center-dish-badge').textContent = centerDish.badge;
      centerCard.dataset.dishId = centerDish.id;
    }

    // Right card
    const rightCard = document.getElementById('spotlight-right');
    if (rightCard) {
      rightCard.querySelector('img').src = rightDish.image;
      rightCard.querySelector('img').alt = rightDish.name;
      rightCard.querySelector('.dish-name').textContent = rightDish.name;
      rightCard.querySelector('.dish-price').textContent = rightDish.price;
      rightCard.dataset.dishId = rightDish.id;
    }
  }

  const prevDishBtn = document.getElementById('carousel-prev');
  const nextDishBtn = document.getElementById('carousel-next');

  if (prevDishBtn) {
    prevDishBtn.addEventListener('click', () => {
      centerDishIdx = (centerDishIdx - 1 + spotlightDishes.length) % spotlightDishes.length;
      updateFeaturedCarousel();
    });
  }

  if (nextDishBtn) {
    nextDishBtn.addEventListener('click', () => {
      centerDishIdx = (centerDishIdx + 1) % spotlightDishes.length;
      updateFeaturedCarousel();
    });
  }

  // Click side cards directly to promote to center
  document.getElementById('spotlight-left')?.addEventListener('click', () => {
    centerDishIdx = (centerDishIdx - 1 + spotlightDishes.length) % spotlightDishes.length;
    updateFeaturedCarousel();
  });
  document.getElementById('spotlight-right')?.addEventListener('click', () => {
    centerDishIdx = (centerDishIdx + 1) % spotlightDishes.length;
    updateFeaturedCarousel();
  });

  // Add spotlight dish to cart
  document.getElementById('btn-order-spotlight')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const curr = spotlightDishes[centerDishIdx];
    addToCart(curr.id, curr.name, curr.numericPrice);
  });

  // Touch swipe gesture support for iPhone & touchscreens on Featured Dishes
  const spotlightRow = document.querySelector('.menu-featured-row');
  let touchStartX = 0;
  let touchEndX = 0;

  if (spotlightRow) {
    spotlightRow.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    spotlightRow.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 45) {
        if (swipeDistance < 0) {
          // Swiped left -> next dish
          centerDishIdx = (centerDishIdx + 1) % spotlightDishes.length;
        } else {
          // Swiped right -> prev dish
          centerDishIdx = (centerDishIdx - 1 + spotlightDishes.length) % spotlightDishes.length;
        }
        updateFeaturedCarousel();
      }
    }, { passive: true });
  }

  // 4. Menu Category Filtering
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;

      menuCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Add items from menu grid to cart
  document.querySelectorAll('.btn-card-add').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.menu-card');
      const id = card.dataset.id;
      const title = card.querySelector('.menu-card-title').textContent;
      const rawPrice = card.querySelector('.menu-card-price').textContent
        .replace('€', '')
        .replace('$', '')
        .replace(',', '.')
        .trim();
      addToCart(id, title, parseFloat(rawPrice));
    });
  });

  // 5. Upcoming Events Carousel (Group 4 in PSD with 3 Dots)
  const eventsData = [
    {
      title: 'Noches Shinwari Karahi',
      category: 'Promociones Especiales',
      desc: 'Disfruta cada fin de semana de nuestra auténtica oferta Karahi de 1KG con 4 Naan recién salidos del tandoor y degustación de té verde Qahwa de cortesía para cerrar con el mejor sabor desi.',
      date: 'Viernes y Sábados | 19:00 h - 00:00 h',
      highlight: 'Karahi 1KG + 4 Naan + Qahwa de Cortesía',
      badge: 'Oferta Especial Fin de Semana',
      image: 'assets/event_food.png'
    },
    {
      title: 'Servicio a Domicilio Rápido',
      category: 'En tu Casa',
      desc: 'Llevamos lo mejor de la cocina de Pakistán e India directo a tu puerta en Castellón de la Plana. Pedido mínimo de 15€. Llámanos o escríbenos por WhatsApp al 645 220 358.',
      date: 'Todos los días | 12:30 - 16:00 h y 19:00 - 00:00 h',
      highlight: 'Pedido Mínimo 15€ • Envío en Castellón',
      badge: 'WhatsApp: 645 220 358',
      image: 'assets/event_food.png'
    },
    {
      title: 'Domingos de Festín Familiar',
      category: 'Especial Familiar',
      desc: 'Reúne a tu familia alrededor de un auténtico festín: bandejas de Biryani de cordero y pollo, Paye tradicional con naans dorados y ricos batidos Mango Lassi para todos.',
      date: 'Cada Domingo | 12:30 h - 16:00 h',
      highlight: 'Menús Compartidos y Postres Desi',
      badge: 'Ideal Familias y Grupos',
      image: 'assets/event_food.png'
    }
  ];

  let currentEventIdx = 0;
  const eventDots = document.querySelectorAll('.event-dot');
  const eventMainTitle = document.querySelector('.event-main-title');
  const eventCategory = document.querySelector('.event-category-title');
  const eventDesc = document.querySelector('.event-description');
  const eventDateText = document.querySelector('.event-date-text');
  const eventHighlightText = document.querySelector('.event-highlight-text');
  const eventImageBadge = document.querySelector('.event-image-badge-text');

  function showEventSlide(idx) {
    currentEventIdx = idx;
    const evt = eventsData[idx];
    
    // Update active dot
    eventDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });

    // Content fade update
    const contentBox = document.querySelector('.event-content-col');
    if (contentBox) {
      contentBox.style.opacity = '0.4';
      setTimeout(() => {
        if (eventMainTitle) eventMainTitle.textContent = evt.title;
        if (eventCategory) eventCategory.textContent = evt.category;
        if (eventDesc) eventDesc.textContent = evt.desc;
        if (eventDateText) eventDateText.textContent = evt.date;
        if (eventHighlightText) eventHighlightText.textContent = evt.highlight;
        if (eventImageBadge) eventImageBadge.textContent = evt.badge;
        contentBox.style.opacity = '1';
      }, 150);
    }
  }

  eventDots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slide = parseInt(this.dataset.slide, 10);
      showEventSlide(slide);
    });
  });

  // Auto-advance events carousel every 7 seconds
  setInterval(() => {
    currentEventIdx = (currentEventIdx + 1) % eventsData.length;
    showEventSlide(currentEventIdx);
  }, 7000);

  // 6. Reservation Form Handling
  const resForm = document.getElementById('reservation-form');
  const resModal = document.getElementById('reservation-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  // Pre-fill tomorrow's date
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('res-name').value.trim();
      const email = document.getElementById('res-email').value.trim();
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const people = document.getElementById('res-people').value;

      if (!name || !email || !date || !time || !people) {
        showToast('Por favor completa todos los campos de la reserva.', 'error');
        return;
      }

      // Generate random confirmation code for Apna Shinwari
      const refCode = 'AS-' + Math.floor(100000 + Math.random() * 900000);

      // Populate confirmation modal
      document.getElementById('conf-name').textContent = name;
      document.getElementById('conf-email').textContent = email;
      document.getElementById('conf-datetime').textContent = `${date} a las ${time}`;
      document.getElementById('conf-guests').textContent = `${people} Persona${people > 1 ? 's' : ''}`;
      document.getElementById('conf-ref').textContent = refCode;

      // Show modal
      resModal.classList.add('is-open');
      showToast('¡Mesa Reservada! Te esperamos en Plaza Clavé 21.', 'success');
      resForm.reset();
    });
  }

  // 7. Modals & Drawer Management
  function closeModal() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('is-open'));
    cartDrawer.classList.remove('is-open');
    if (!navMenu?.classList.contains('is-active')) {
      document.body.classList.remove('no-scroll');
    }
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  });

  // Story "Leer Más" Modal
  const storyBtn = document.getElementById('btn-story-modal');
  const storyModal = document.getElementById('story-modal');
  if (storyBtn && storyModal) {
    storyBtn.addEventListener('click', () => {
      storyModal.classList.add('is-open');
    });
  }

  // 8. Cart Drawer Functionality
  function updateCartUI() {
    cartItemsList.innerHTML = '';
    let totalQty = 0;
    let subtotal = 0;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: #94a3b8;">
          <p style="font-size: 1.1rem; margin-bottom: 8px;">Tu pedido está vacío.</p>
          <span style="font-size: 0.85rem;">¡Explora nuestras Karahis, Biryanis y platos para añadir!</span>
        </div>
      `;
    } else {
      cart.forEach(item => {
        totalQty += item.qty;
        subtotal += item.price * item.qty;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
          <div class="cart-item-details">
            <strong>${item.title}</strong>
            <span>${formatPrice(item.price)}</span>
          </div>
          <div class="cart-qty-controls">
            <button class="btn-qty" data-action="dec" data-id="${item.id}" aria-label="Restar">-</button>
            <span style="font-weight: 700; min-width: 18px; text-align: center;">${item.qty}</span>
            <button class="btn-qty" data-action="inc" data-id="${item.id}" aria-label="Sumar">+</button>
          </div>
        `;
        cartItemsList.appendChild(row);
      });
    }

    cartBadge.textContent = totalQty;
    cartSubtotalEl.textContent = formatPrice(subtotal);
  }

  function addToCart(id, title, price) {
    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, title, price, qty: 1 });
    }
    updateCartUI();
    showToast(`¡Añadido "${title}" a tu pedido!`, 'success');
  }

  cartItemsList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-qty');
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (action === 'inc') {
      item.qty += 1;
    } else if (action === 'dec') {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    }
    updateCartUI();
  });

  if (cartToggle) {
    cartToggle.addEventListener('click', () => {
      closeMobileMenu();
      cartDrawer.classList.toggle('is-open');
    });
  }

  document.getElementById('btn-close-cart')?.addEventListener('click', () => {
    cartDrawer.classList.remove('is-open');
  });

  document.getElementById('btn-checkout-submit')?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('¡Tu pedido está vacío! Añade platos primero.', 'error');
      return;
    }
    cartDrawer.classList.remove('is-open');
    showToast('¡Pedido recibido! Llámanos o escríbenos al 645 220 358 para confirmar la entrega.', 'success');
    cart = [];
    updateCartUI();
  });

  // 9. Toast Notification Helper
  let toastTimer;
  function showToast(msg, type = 'info') {
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast-notice show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // Initial cart UI render
  updateCartUI();
  updateFeaturedCarousel();
});
