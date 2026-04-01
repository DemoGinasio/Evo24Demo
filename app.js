/* ============================================================
   EVO GYM — Sistema de Gestão 24h
   Application Logic
   ============================================================ */

// ————— DATA & STATE —————

const APP_KEY = 'evogym_';

const PLANOS = [
    {
        id: 'plano-3x',
        nome: '3x por Semana',
        preco: 33,
        descricao: 'Acesso 3 vezes por semana',
        features: [
            '3 sessões por semana',
            'Acesso das 8h às 22h',
            'Área de musculação',
            'Cacifos incluídos'
        ],
        icon: 'fas fa-calendar-week',
        color: '#74B9FF'
    },
    {
        id: 'plano-6d',
        nome: 'Acesso 6 Dias',
        preco: 39,
        descricao: 'Acesso das 6h às 22h, 6 dias/semana',
        features: [
            '6 dias por semana',
            'Acesso das 6h às 22h',
            'Musculação + Cardio',
            'Aulas de grupo incluídas',
            'Cacifos incluídos'
        ],
        icon: 'fas fa-clock',
        color: '#6C5CE7',
        popular: true
    },
    {
        id: 'plano-24h',
        nome: 'Ilimitado 24h',
        preco: 45,
        descricao: 'Acesso ilimitado 24 horas, 7 dias/semana',
        features: [
            'Acesso 24/7 ilimitado',
            'Todas as áreas do ginásio',
            'Aulas de grupo incluídas',
            'Área VIP e sauna',
            'Toalha incluída',
            'Avaliação física mensal'
        ],
        icon: 'fas fa-infinity',
        color: '#00B894'
    }
];

const PLANOS_TREINO = [
    {
        id: 'treino-costas',
        nome: 'Costas',
        icon: 'fas fa-dumbbell',
        color: '#6C5CE7',
        descricao: 'Desenvolvimento completo das costas e grande dorsal',
        exercicios: [
            { nome: 'Puxada à frente', series: 4, reps: '10-12', descanso: '90s', notas: 'Pegada larga, foco no grande dorsal' },
            { nome: 'Remada curvada com barra', series: 4, reps: '8-10', descanso: '90s', notas: 'Manter costas neutras, cotovelos junto ao corpo' },
            { nome: 'Remada unilateral com haltere', series: 3, reps: '10-12', descanso: '60s', notas: 'Apoiar no banco, rotação do torso controlada' },
            { nome: 'Puxada pegada neutra', series: 3, reps: '10-12', descanso: '60s', notas: 'Variação para ativação do bíceps longo' },
            { nome: 'Hiperextensão lombar', series: 3, reps: '15', descanso: '60s', notas: 'Não hiperestender a lombar, movimento controlado' }
        ]
    },
    {
        id: 'treino-biceps',
        nome: 'Bíceps',
        icon: 'fas fa-hand-rock',
        color: '#74B9FF',
        descricao: 'Hipertrofia e definição dos bíceps',
        exercicios: [
            { nome: 'Curl bíceps com barra', series: 4, reps: '10-12', descanso: '60s', notas: 'Cotovelos fixos, não balançar o corpo' },
            { nome: 'Curl alternado com halteres', series: 3, reps: '10-12', descanso: '60s', notas: 'Supinar o punho no topo do movimento' },
            { nome: 'Curl concentrado', series: 3, reps: '12', descanso: '45s', notas: 'Isolamento máximo, cotovelo contra a coxa' },
            { nome: 'Curl martelo (Hammer Curl)', series: 3, reps: '12', descanso: '45s', notas: 'Trabalha bíceps braquial e braquiorradial' }
        ]
    },
    {
        id: 'treino-triceps',
        nome: 'Tríceps',
        icon: 'fas fa-bolt',
        color: '#E17055',
        descricao: 'Desenvolvimento e definição dos tríceps',
        exercicios: [
            { nome: 'Tríceps no pulley (corda)', series: 4, reps: '12-15', descanso: '60s', notas: 'Abrir as mãos no ponto mais baixo' },
            { nome: 'Extensão francesa com barra', series: 3, reps: '10', descanso: '75s', notas: 'Skull crushers, não flectir os cotovelos para fora' },
            { nome: 'Tríceps banco (fundos)', series: 3, reps: '12-15', descanso: '60s', notas: 'Corpo próximo ao banco, cotovelos alinhados' },
            { nome: 'Extensão overhead com haltere', series: 3, reps: '12', descanso: '60s', notas: 'Cabeça longa do tríceps, cotovelos apontados ao teto' }
        ]
    },
    {
        id: 'treino-peito',
        nome: 'Peito',
        icon: 'fas fa-shield-heart',
        color: '#00B894',
        descricao: 'Desenvolvimento do peitoral maior e menor',
        exercicios: [
            { nome: 'Supino reto com barra', series: 4, reps: '8-10', descanso: '90s', notas: 'Omoplatas travadas, descida controlada até ao peito' },
            { nome: 'Supino inclinado com halteres', series: 3, reps: '10-12', descanso: '75s', notas: '30-45° de inclinação, foco na porção clavicular' },
            { nome: 'Crucifixo com halteres', series: 3, reps: '12', descanso: '60s', notas: 'Ligeira flexão dos cotovelos, não descer abaixo do plano' },
            { nome: 'Peck deck / Fly na máquina', series: 3, reps: '12-15', descanso: '60s', notas: 'Contração máxima no centro, movimento em arco' }
        ]
    },
    {
        id: 'treino-ombros',
        nome: 'Ombros',
        icon: 'fas fa-arrows-up-down',
        color: '#FDCB6E',
        descricao: 'Volume e definição do deltóide',
        exercicios: [
            { nome: 'Desenvolvimento militar com barra', series: 4, reps: '8-10', descanso: '90s', notas: 'Core ativado, não arquear a lombar' },
            { nome: 'Elevação lateral com halteres', series: 4, reps: '12-15', descanso: '60s', notas: 'Ligeiro tilt para frente, cotovelo ligeiramente adiantado' },
            { nome: 'Elevação frontal com haltere', series: 3, reps: '12', descanso: '60s', notas: 'Alternado, não passar o nível dos ombros' },
            { nome: 'Encolhimento com halteres', series: 3, reps: '15', descanso: '45s', notas: 'Movimento puramente vertical, sem rotação' }
        ]
    },
    {
        id: 'treino-pernas',
        nome: 'Pernas',
        icon: 'fas fa-person-running',
        color: '#A29BFE',
        descricao: 'Força e hipertrofia dos membros inferiores',
        exercicios: [
            { nome: 'Agachamento livre', series: 4, reps: '10', descanso: '120s', notas: 'Joelhos alinhados com os pés, descer abaixo do paralelo' },
            { nome: 'Leg press 45°', series: 4, reps: '12', descanso: '90s', notas: 'Pés à largura dos ombros, joelhos não ultrapassar os pés' },
            { nome: 'Cadeira extensora', series: 3, reps: '12-15', descanso: '60s', notas: 'Isolamento do quadricípite, contração no topo' },
            { nome: 'Mesa flexora', series: 3, reps: '12', descanso: '60s', notas: 'Isquiotibiais, não elevar os glúteos da mesa' },
            { nome: 'Panturrilha em pé', series: 4, reps: '20', descanso: '45s', notas: 'Amplitude máxima, descida lenta para alongamento' }
        ]
    },
    {
        id: 'treino-abdominais',
        nome: 'Abdominais',
        icon: 'fas fa-table-list',
        color: '#FD7272',
        descricao: 'Core e definição abdominal',
        exercicios: [
            { nome: 'Crunch abdominal', series: 4, reps: '20', descanso: '45s', notas: 'Não puxar o pescoço, contração abdominal no topo' },
            { nome: 'Prancha isométrica', series: 4, reps: '45-60s', descanso: '45s', notas: 'Corpo alinhado, core totalmente contraído' },
            { nome: 'Russian twist', series: 3, reps: '20', descanso: '45s', notas: 'Com ou sem peso, rotação controlada do torso' },
            { nome: 'Elevação de pernas', series: 3, reps: '15', descanso: '45s', notas: 'Pernas retas ou ligeiramente fletidas, não balançar' },
            { nome: 'Bicicleta', series: 3, reps: '20', descanso: '45s', notas: 'Alternado cotovelo-joelho oposto, movimento lento' }
        ]
    }
];

// Default clients for demo
const DEFAULT_CLIENTES = [
    { id: 'C001', nome: 'Ricardo Silva', email: 'ricardo@email.pt', plano: 'plano-24h', estado: 'ativo', validade: getFutureDate(45) },
    { id: 'C002', nome: 'Ana Santos', email: 'ana.santos@email.pt', plano: 'plano-6d', estado: 'ativo', validade: getFutureDate(20) },
    { id: 'C003', nome: 'Miguel Costa', email: 'miguel@email.pt', plano: 'plano-3x', estado: 'ativo', validade: getFutureDate(2) },
    { id: 'C004', nome: 'Sofia Ferreira', email: 'sofia@email.pt', plano: 'plano-24h', estado: 'expirado', validade: getPastDate(5) },
    { id: 'C005', nome: 'João Oliveira', email: 'joao@email.pt', plano: 'plano-6d', estado: 'ativo', validade: getFutureDate(60) },
    { id: 'C006', nome: 'Maria Lopes', email: 'maria@email.pt', plano: 'plano-3x', estado: 'expirado', validade: getPastDate(10) },
    { id: 'C007', nome: 'Tiago Mendes', email: 'tiago@email.pt', plano: 'plano-24h', estado: 'ativo', validade: getFutureDate(1) },
    { id: 'C008', nome: 'Beatriz Almeida', email: 'beatriz@email.pt', plano: 'plano-6d', estado: 'ativo', validade: getFutureDate(30) },
    { id: 'C009', nome: 'Pedro Rocha', email: 'pedro@email.pt', plano: 'plano-3x', estado: 'expirado', validade: getPastDate(15) },
    { id: 'C010', nome: 'Inês Martins', email: 'ines@email.pt', plano: 'plano-24h', estado: 'ativo', validade: getFutureDate(90) }
];

const DEFAULT_PAGAMENTOS = [
    { id: 'P001', clienteId: 'C001', data: getPastDate(2), plano: 'plano-24h', valor: 45, metodo: 'mbway' },
    { id: 'P002', clienteId: 'C002', data: getPastDate(5), plano: 'plano-6d', valor: 39, metodo: 'multibanco' },
    { id: 'P003', clienteId: 'C005', data: getPastDate(8), plano: 'plano-6d', valor: 39, metodo: 'transferencia' },
    { id: 'P004', clienteId: 'C008', data: getPastDate(3), plano: 'plano-6d', valor: 39, metodo: 'dinheiro' },
    { id: 'P005', clienteId: 'C010', data: getPastDate(1), plano: 'plano-24h', valor: 45, metodo: 'mbway' },
    { id: 'P006', clienteId: 'C003', data: getPastDate(25), plano: 'plano-3x', valor: 33, metodo: 'multibanco' },
    { id: 'P007', clienteId: 'C007', data: getPastDate(12), plano: 'plano-24h', valor: 45, metodo: 'mbway' }
];

// Generate some default access history
function generateDefaultHistory() {
    const history = [];
    const clients = DEFAULT_CLIENTES;
    const statuses = ['permitido', 'permitido', 'permitido', 'permitido', 'negado'];
    let idCounter = 1;
    
    for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
        const numEntries = Math.floor(Math.random() * 6) + 3;
        for (let j = 0; j < numEntries; j++) {
            const cliente = clients[Math.floor(Math.random() * clients.length)];
            const date = new Date();
            date.setDate(date.getDate() - dayOffset);
            date.setHours(Math.floor(Math.random() * 14) + 6, Math.floor(Math.random() * 60));
            
            const status = cliente.estado === 'expirado' ? 'negado' : statuses[Math.floor(Math.random() * statuses.length)];
            
            history.push({
                id: 'H' + String(idCounter++).padStart(3, '0'),
                clienteId: cliente.id,
                clienteNome: cliente.nome,
                data: date.toISOString(),
                status: status
            });
        }
    }
    return history.sort((a, b) => new Date(b.data) - new Date(a.data));
}

// ————— UTILITY FUNCTIONS —————

function getFutureDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

function getPastDate(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
           d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
}

function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
}

function daysUntil(dateStr) {
    const target = new Date(dateStr);
    const now = new Date();
    target.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function isToday(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    return d.toDateString() === now.toDateString();
}

function isWithinDays(dateStr, days) {
    const d = new Date(dateStr);
    const now = new Date();
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    return d >= daysAgo && d <= now;
}

function generateId(prefix) {
    const items = prefix === 'C' ? getClientes() : prefix === 'P' ? getPagamentos() : getHistorico();
    const ids = items.map(i => parseInt(i.id.replace(/\D/g, '')));
    const max = ids.length > 0 ? Math.max(...ids) : 0;
    return prefix + String(max + 1).padStart(3, '0');
}

// ————— LOCAL STORAGE —————

function save(key, data) {
    localStorage.setItem(APP_KEY + key, JSON.stringify(data));
}

function load(key) {
    const data = localStorage.getItem(APP_KEY + key);
    return data ? JSON.parse(data) : null;
}

function getClientes() {
    return load('clientes') || DEFAULT_CLIENTES;
}

function setClientes(clientes) {
    save('clientes', clientes);
}

function getPagamentos() {
    return load('pagamentos') || DEFAULT_PAGAMENTOS;
}

function setPagamentos(pagamentos) {
    save('pagamentos', pagamentos);
}

function getHistorico() {
    return load('historico') || generateDefaultHistory();
}

function setHistorico(historico) {
    save('historico', historico);
}

function getPlanoById(planoId) {
    return PLANOS.find(p => p.id === planoId);
}

function getClienteById(clienteId) {
    return getClientes().find(c => c.id === clienteId);
}

function getPlanosClienteTreino() {
    return load('planos_treino_clientes') || {};
}

function setPlanosClienteTreino(data) {
    save('planos_treino_clientes', data);
}

function getPlanoTreinoById(planoId) {
    return PLANOS_TREINO.find(p => p.id === planoId);
}

// ————— INITIALIZE APP —————

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupEventListeners();
    updateDateDisplay();
    checkAutoExpiry();
});

function initializeData() {
    // Initialize data in localStorage if not exists
    if (!load('clientes')) setClientes(DEFAULT_CLIENTES);
    if (!load('pagamentos')) setPagamentos(DEFAULT_PAGAMENTOS);
    if (!load('historico')) setHistorico(generateDefaultHistory());
}

function updateDateDisplay() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('page-date').textContent = now.toLocaleDateString('pt-PT', options);
}

// Auto-check expired clients
function checkAutoExpiry() {
    const clientes = getClientes();
    let updated = false;
    clientes.forEach(c => {
        const days = daysUntil(c.validade);
        if (days < 0 && c.estado === 'ativo') {
            c.estado = 'expirado';
            updated = true;
        }
    });
    if (updated) setClientes(clientes);
}

// ————— EVENT LISTENERS —————

function setupEventListeners() {
    // Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Sidebar Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToSection(link.dataset.section);
        });
    });
    
    // Sidebar toggle (mobile)
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
    
    // Logout
    document.getElementById('btn-logout').addEventListener('click', handleLogout);
    
    // Client management
    document.getElementById('btn-add-cliente').addEventListener('click', () => openClienteModal());
    document.getElementById('form-cliente').addEventListener('submit', handleSaveCliente);
    document.getElementById('modal-cliente-close').addEventListener('click', closeClienteModal);
    document.getElementById('modal-cliente-cancel').addEventListener('click', closeClienteModal);
    document.getElementById('search-clientes').addEventListener('input', renderClientes);
    
    // Access Control
    document.getElementById('btn-validar-acesso').addEventListener('click', handleValidarAcesso);
    document.getElementById('access-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleValidarAcesso();
    });
    
    // Plan assignment
    document.getElementById('btn-assign-plan').addEventListener('click', handleAssignPlan);
    
    // Treino plan assignment
    document.getElementById('btn-assign-treino-plan').addEventListener('click', handleAssignPlanoTreino);
    document.getElementById('modal-treino-close').addEventListener('click', () => {
        document.getElementById('modal-treino-plan').classList.add('hidden');
    });
    
    // Payments
    document.getElementById('btn-registar-pagamento').addEventListener('click', () => openPagamentoModal());
    document.getElementById('form-pagamento').addEventListener('submit', handleRegistarPagamento);
    document.getElementById('modal-pagamento-close').addEventListener('click', closePagamentoModal);
    document.getElementById('modal-pagamento-cancel').addEventListener('click', closePagamentoModal);
    document.getElementById('pag-plano').addEventListener('change', updatePaymentValue);
    
    // History filters
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderHistorico(btn.dataset.filter);
        });
    });
    
    // Alert badge
    document.getElementById('topbar-alert-badge').addEventListener('click', () => {
        navigateToSection('dashboard');
    });
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.add('hidden');
            }
        });
    });
}

// ============================================================
// LOGIN
// ============================================================

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email === 'admin@evogym.pt' && password === 'admin123') {
        Swal.fire({
            icon: 'success',
            title: 'Bem-vindo!',
            text: 'Login efetuado com sucesso.',
            timer: 1500,
            showConfirmButton: false,
            background: '#fff',
            customClass: { popup: 'swal-custom' }
        }).then(() => {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
            loadDashboard();
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Acesso Negado',
            text: 'Email ou password incorretos.',
            confirmButtonText: 'Tentar novamente',
            background: '#fff'
        });
    }
}

function handleLogout() {
    Swal.fire({
        title: 'Sair do sistema?',
        text: 'Tem a certeza que deseja terminar sessão?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, sair',
        cancelButtonText: 'Cancelar',
        background: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('app').classList.add('hidden');
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        }
    });
}

// ============================================================
// NAVIGATION
// ============================================================

function navigateToSection(section) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-section="${section}"]`).classList.add('active');
    
    // Update sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${section}`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        clientes: 'Gestão de Clientes',
        acessos: 'Controlo de Acesso',
        planos: 'Planos de Subscrição',
        'planos-treino': 'Planos de Treino',
        vendas: 'Vendas / Receita',
        historico: 'Histórico de Acessos'
    };
    document.getElementById('page-title').textContent = titles[section] || 'Dashboard';
    
    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
    
    // Load section data
    switch (section) {
        case 'dashboard': loadDashboard(); break;
        case 'clientes': renderClientes(); break;
        case 'acessos': renderAccessControl(); break;
        case 'planos': renderPlanos(); break;
        case 'planos-treino': renderPlanosTreino(); break;
        case 'vendas': renderVendas(); break;
        case 'historico': renderHistorico('hoje'); break;
    }
}

// ============================================================
// DASHBOARD
// ============================================================

let entriesChart = null;

function loadDashboard() {
    const clientes = getClientes();
    const historico = getHistorico();
    const pagamentos = getPagamentos();
    
    checkAutoExpiry();
    
    const totalClientes = clientes.length;
    const ativos = clientes.filter(c => c.estado === 'ativo').length;
    const expirados = clientes.filter(c => c.estado === 'expirado').length;
    
    const entradasHoje = historico.filter(h => isToday(h.data) && h.status === 'permitido').length;
    
    // Revenue this month
    const now = new Date();
    const receitaMensal = pagamentos
        .filter(p => {
            const d = new Date(p.data);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        .reduce((sum, p) => sum + p.valor, 0);
    
    // Update KPIs with animation
    animateValue('kpi-val-total', totalClientes);
    animateValue('kpi-val-ativos', ativos);
    animateValue('kpi-val-expirados', expirados);
    animateValue('kpi-val-entradas', entradasHoje);
    document.getElementById('kpi-val-receita').textContent = receitaMensal + '€';
    
    // Alerts
    renderDashboardAlerts(clientes, historico);
    
    // Recent access
    renderRecentAccess(historico);
    
    // Chart
    renderEntriesChart(historico);

    // Treino widget
    renderDashboardTreinoWidget(clientes);
}

function animateValue(elementId, target) {
    const el = document.getElementById(elementId);
    const start = parseInt(el.textContent) || 0;
    const duration = 600;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + (target - start) * eased);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function renderDashboardAlerts(clientes, historico) {
    const alertsList = document.getElementById('alerts-list');
    const alerts = [];
    
    // Clients expiring in 3 days
    clientes.forEach(c => {
        const days = daysUntil(c.validade);
        if (c.estado === 'ativo' && days >= 0 && days <= 3) {
            alerts.push({
                type: 'warning',
                icon: 'fas fa-clock',
                message: `<strong>${c.nome}</strong> expira em ${days === 0 ? 'hoje' : days + ' dia' + (days > 1 ? 's' : '')}! Contactar para renovação.`
            });
        }
    });
    
    // Expired clients trying to access recently
    const deniedToday = historico.filter(h => isToday(h.data) && h.status === 'negado');
    if (deniedToday.length > 0) {
        alerts.push({
            type: 'danger',
            icon: 'fas fa-shield-alt',
            message: `<strong>${deniedToday.length}</strong> tentativa${deniedToday.length > 1 ? 's' : ''} de acesso negado${deniedToday.length > 1 ? 's' : ''} hoje.`
        });
    }
    
    // Multiple denied in a row
    const consecutiveDenied = historico.filter(h => isToday(h.data) && h.status === 'negado');
    const deniedByClient = {};
    consecutiveDenied.forEach(h => {
        deniedByClient[h.clienteNome] = (deniedByClient[h.clienteNome] || 0) + 1;
    });
    Object.entries(deniedByClient).forEach(([name, count]) => {
        if (count >= 2) {
            alerts.push({
                type: 'danger',
                icon: 'fas fa-exclamation-circle',
                message: `<strong>${name}</strong> tem ${count} acessos negados seguidos. Possível tentativa irregular.`
            });
        }
    });
    
    // Expired clients count
    const expiredCount = clientes.filter(c => c.estado === 'expirado').length;
    if (expiredCount > 0) {
        alerts.push({
            type: 'info',
            icon: 'fas fa-user-times',
            message: `<strong>${expiredCount}</strong> cliente${expiredCount > 1 ? 's' : ''} com plano expirado. Oportunidade de reativação.`
        });
    }
    
    // Update alert count
    document.getElementById('alert-count').textContent = alerts.length;
    
    if (alerts.length === 0) {
        alertsList.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><p>Sem alertas pendentes</p></div>';
        return;
    }
    
    alertsList.innerHTML = alerts.map(a => `
        <div class="alert-item ${a.type}">
            <i class="${a.icon}"></i>
            <span>${a.message}</span>
        </div>
    `).join('');
}

function renderDashboardTreinoWidget(clientes) {
    const container = document.getElementById('dashboard-treino-widget');
    const planosClientes = getPlanosClienteTreino();

    // Count per muscle group
    const countByPlan = {};
    PLANOS_TREINO.forEach(p => { countByPlan[p.id] = 0; });
    Object.values(planosClientes).forEach(arr => {
        arr.forEach(pid => { if (countByPlan[pid] !== undefined) countByPlan[pid]++; });
    });

    const totalComTreino = Object.keys(planosClientes).filter(cid =>
        planosClientes[cid] && planosClientes[cid].length > 0
    ).length;
    const totalSemTreino = clientes.filter(c => c.estado === 'ativo' && !planosClientes[c.id]?.length).length;

    container.innerHTML = `
        <div class="treino-widget-stats">
            <div class="treino-widget-stat">
                <span class="treino-widget-val" style="color:var(--primary)">${totalComTreino}</span>
                <span class="treino-widget-label">Clientes com plano</span>
            </div>
            <div class="treino-widget-stat">
                <span class="treino-widget-val" style="color:var(--danger)">${totalSemTreino}</span>
                <span class="treino-widget-label">Ativos sem plano</span>
            </div>
            <div class="treino-widget-stat">
                <span class="treino-widget-val" style="color:var(--success)">${PLANOS_TREINO.length}</span>
                <span class="treino-widget-label">Grupos musculares</span>
            </div>
        </div>
        <div class="treino-widget-grid">
            ${PLANOS_TREINO.map(p => `
            <div class="treino-widget-item" onclick="navigateToSection('planos-treino')" title="Ver ${p.nome}">
                <span class="treino-widget-icon" style="background:${p.color}15;color:${p.color}"><i class="${p.icon}"></i></span>
                <span class="treino-widget-name">${p.nome}</span>
                <span class="treino-widget-count" style="color:${p.color}">${countByPlan[p.id]}</span>
            </div>`).join('')}
        </div>
    `;
}

function renderRecentAccess(historico) {
    const list = document.getElementById('recent-access-list');
    const recent = historico.slice(0, 8);
    
    if (recent.length === 0) {
        list.innerHTML = '<div class="empty-state"><i class="fas fa-door-closed"></i><p>Sem entradas registadas</p></div>';
        return;
    }
    
    list.innerHTML = recent.map(h => `
        <div class="recent-item">
            <span class="recent-name">${h.clienteNome}</span>
            <span class="recent-time">${formatDateTime(h.data)}</span>
            <span class="status-badge ${h.status}">${h.status}</span>
        </div>
    `).join('');
}

function renderEntriesChart(historico) {
    const canvas = document.getElementById('chart-entradas');
    const ctx = canvas.getContext('2d');
    
    // Last 7 days
    const labels = [];
    const dataPermitido = [];
    const dataNegado = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit' }));
        
        const dayStr = date.toDateString();
        const dayEntries = historico.filter(h => new Date(h.data).toDateString() === dayStr);
        dataPermitido.push(dayEntries.filter(h => h.status === 'permitido').length);
        dataNegado.push(dayEntries.filter(h => h.status === 'negado').length);
    }
    
    if (entriesChart) entriesChart.destroy();
    
    entriesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Permitido',
                    data: dataPermitido,
                    backgroundColor: 'rgba(0, 184, 148, 0.7)',
                    borderColor: '#00B894',
                    borderWidth: 1,
                    borderRadius: 6,
                    borderSkipped: false
                },
                {
                    label: 'Negado',
                    data: dataNegado,
                    backgroundColor: 'rgba(225, 112, 85, 0.7)',
                    borderColor: '#E17055',
                    borderWidth: 1,
                    borderRadius: 6,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { family: 'Inter', size: 12, weight: 500 }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 11 } }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        font: { family: 'Inter', size: 11 }
                    },
                    grid: { color: 'rgba(0,0,0,0.04)' }
                }
            }
        }
    });
}

// ============================================================
// CLIENTES
// ============================================================

function renderClientes() {
    const clientes = getClientes();
    const search = document.getElementById('search-clientes').value.toLowerCase();
    const tbody = document.getElementById('tbody-clientes');
    
    const filtered = clientes.filter(c =>
        c.nome.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.id.toLowerCase().includes(search)
    );
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="7">
                <div class="empty-state"><i class="fas fa-users"></i><p>Nenhum cliente encontrado</p></div>
            </td></tr>`;
        return;
    }
    
    tbody.innerHTML = filtered.map(c => {
        const plano = getPlanoById(c.plano);
        const days = daysUntil(c.validade);
        const isExpiring = c.estado === 'ativo' && days >= 0 && days <= 3;
        const rowClass = c.estado === 'expirado' ? 'row-expired' : '';
        
        return `
        <tr class="${rowClass}">
            <td><strong>${c.id}</strong></td>
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${plano ? plano.nome : '-'}</td>
            <td>
                ${formatDate(c.validade)}
                ${isExpiring ? '<br><small style="color:var(--danger);font-weight:600;">⚠ Expira em ' + days + ' dia' + (days !== 1 ? 's' : '') + '</small>' : ''}
            </td>
            <td><span class="status-badge ${c.estado}">${c.estado}</span></td>
            <td>
                <div class="actions-cell">
                    <button class="btn-icon btn-edit" onclick="openClienteModal('${c.id}')" title="Editar">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteCliente('${c.id}')" title="Remover">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${c.estado === 'expirado' ? `
                    <button class="btn-icon btn-renew" onclick="renewCliente('${c.id}')" title="Renovar plano">
                        <i class="fas fa-sync-alt"></i>
                    </button>` : ''}
                </div>
            </td>
        </tr>`;
    }).join('');
}

function openClienteModal(clienteId = null) {
    const modal = document.getElementById('modal-cliente');
    const title = document.getElementById('modal-cliente-title');
    const form = document.getElementById('form-cliente');
    
    // Populate plan dropdown
    const planoSelect = document.getElementById('cliente-plano');
    planoSelect.innerHTML = '<option value="">Selecionar plano...</option>';
    PLANOS.forEach(p => {
        planoSelect.innerHTML += `<option value="${p.id}">${p.nome} — ${p.preco}€</option>`;
    });
    
    if (clienteId) {
        const cliente = getClienteById(clienteId);
        title.textContent = 'Editar Cliente';
        document.getElementById('cliente-id').value = cliente.id;
        document.getElementById('cliente-nome').value = cliente.nome;
        document.getElementById('cliente-email').value = cliente.email;
        document.getElementById('cliente-plano').value = cliente.plano;
        document.getElementById('cliente-validade').value = cliente.validade;
        document.getElementById('cliente-estado').value = cliente.estado;
    } else {
        title.textContent = 'Novo Cliente';
        form.reset();
        document.getElementById('cliente-id').value = '';
        // Default date: 30 days from now
        document.getElementById('cliente-validade').value = getFutureDate(30);
        document.getElementById('cliente-estado').value = 'ativo';
    }
    
    modal.classList.remove('hidden');
}

function closeClienteModal() {
    document.getElementById('modal-cliente').classList.add('hidden');
}

function handleSaveCliente(e) {
    e.preventDefault();
    
    const id = document.getElementById('cliente-id').value;
    const nome = document.getElementById('cliente-nome').value.trim();
    const email = document.getElementById('cliente-email').value.trim();
    const plano = document.getElementById('cliente-plano').value;
    const validade = document.getElementById('cliente-validade').value;
    const estado = document.getElementById('cliente-estado').value;
    
    if (!nome || !email || !plano || !validade) {
        Swal.fire({ icon: 'warning', title: 'Campos em falta', text: 'Preencha todos os campos obrigatórios.', background: '#fff' });
        return;
    }
    
    const clientes = getClientes();
    
    if (id) {
        // Edit existing
        const index = clientes.findIndex(c => c.id === id);
        if (index !== -1) {
            clientes[index] = { id, nome, email, plano, validade, estado };
            setClientes(clientes);
            Swal.fire({ icon: 'success', title: 'Cliente atualizado!', text: `${nome} foi atualizado com sucesso.`, timer: 1500, showConfirmButton: false, background: '#fff' });
        }
    } else {
        // Add new
        const newId = generateId('C');
        clientes.push({ id: newId, nome, email, plano, validade, estado });
        setClientes(clientes);
        Swal.fire({ icon: 'success', title: 'Cliente adicionado!', text: `${nome} foi adicionado com sucesso. ID: ${newId}`, timer: 2000, showConfirmButton: false, background: '#fff' });
    }
    
    closeClienteModal();
    renderClientes();
}

function deleteCliente(clienteId) {
    const cliente = getClienteById(clienteId);
    Swal.fire({
        title: 'Remover cliente?',
        html: `Tem a certeza que deseja remover <strong>${cliente.nome}</strong>?<br><small>Esta ação não pode ser desfeita.</small>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, remover',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#E17055',
        background: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            const clientes = getClientes().filter(c => c.id !== clienteId);
            setClientes(clientes);
            renderClientes();
            Swal.fire({ icon: 'success', title: 'Removido!', text: `${cliente.nome} foi removido.`, timer: 1500, showConfirmButton: false, background: '#fff' });
        }
    });
}

function renewCliente(clienteId) {
    const cliente = getClienteById(clienteId);
    const plano = getPlanoById(cliente.plano);
    
    Swal.fire({
        title: 'Renovar Plano',
        html: `Renovar plano de <strong>${cliente.nome}</strong>?<br>
               Plano: ${plano.nome} — <strong>${plano.preco}€</strong><br>
               <small>A validade será estendida por 30 dias.</small>`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Renovar e Registar Pagamento',
        cancelButtonText: 'Cancelar',
        background: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            // Update client
            const clientes = getClientes();
            const index = clientes.findIndex(c => c.id === clienteId);
            clientes[index].estado = 'ativo';
            clientes[index].validade = getFutureDate(30);
            setClientes(clientes);
            
            // Register payment
            const pagamentos = getPagamentos();
            pagamentos.unshift({
                id: generateId('P'),
                clienteId: clienteId,
                data: new Date().toISOString().split('T')[0],
                plano: cliente.plano,
                valor: plano.preco,
                metodo: 'mbway'
            });
            setPagamentos(pagamentos);
            
            renderClientes();
            
            Swal.fire({
                icon: 'success',
                title: 'Plano Renovado!',
                html: `<strong>${cliente.nome}</strong> está ativo novamente.<br>Pagamento de ${plano.preco}€ registado.`,
                timer: 2500,
                showConfirmButton: false,
                background: '#fff'
            });
        }
    });
}

// ============================================================
// ACCESS CONTROL
// ============================================================

function renderAccessControl() {
    const clientes = getClientes();
    const list = document.getElementById('access-clients-list');
    
    list.innerHTML = clientes.map(c => `
        <div class="quick-client-item" onclick="document.getElementById('access-input').value='${c.id}'">
            <span>${c.nome}</span>
            <span class="client-id">${c.id}</span>
        </div>
    `).join('');
    
    document.getElementById('access-input').value = '';
    resetAccessStatus();
}

function handleValidarAcesso() {
    const input = document.getElementById('access-input').value.trim().toUpperCase();
    
    if (!input) {
        Swal.fire({ icon: 'warning', title: 'ID em falta', text: 'Insira um ID de cliente para validar.', background: '#fff' });
        return;
    }
    
    const cliente = getClienteById(input);
    const iconEl = document.getElementById('access-status-icon');
    
    // Register in history
    const historico = getHistorico();
    
    if (!cliente) {
        // Unknown ID
        historico.unshift({
            id: generateId('H'),
            clienteId: input,
            clienteNome: 'Desconhecido (' + input + ')',
            data: new Date().toISOString(),
            status: 'negado'
        });
        setHistorico(historico);
        
        iconEl.className = 'access-icon denied';
        iconEl.innerHTML = '<i class="fas fa-times"></i>';
        
        Swal.fire({
            icon: 'error',
            title: '⚠️ ID Não Reconhecido',
            html: `O identificador <strong>${input}</strong> não existe no sistema.<br><small>Tentativa registada para segurança.</small>`,
            confirmButtonText: 'OK',
            background: '#fff'
        });
        
        setTimeout(resetAccessStatus, 3000);
        return;
    }
    
    if (cliente.estado === 'expirado') {
        // Expired client
        historico.unshift({
            id: generateId('H'),
            clienteId: cliente.id,
            clienteNome: cliente.nome,
            data: new Date().toISOString(),
            status: 'negado'
        });
        setHistorico(historico);
        
        iconEl.className = 'access-icon denied';
        iconEl.innerHTML = '<i class="fas fa-lock"></i>';
        
        Swal.fire({
            icon: 'error',
            title: '🔒 Acesso Negado',
            html: `<strong>${cliente.nome}</strong><br>
                   Plano expirado em ${formatDate(cliente.validade)}<br>
                   <small>Por favor dirija-se à receção para renovar o plano.</small>`,
            confirmButtonText: 'OK',
            background: '#fff'
        });
        
        setTimeout(resetAccessStatus, 3000);
        return;
    }
    
    // Active client — access granted
    historico.unshift({
        id: generateId('H'),
        clienteId: cliente.id,
        clienteNome: cliente.nome,
        data: new Date().toISOString(),
        status: 'permitido'
    });
    setHistorico(historico);
    
    iconEl.className = 'access-icon success';
    iconEl.innerHTML = '<i class="fas fa-door-open"></i>';
    
    const plano = getPlanoById(cliente.plano);
    
    Swal.fire({
        icon: 'success',
        title: '✅ Porta Aberta',
        html: `Bem-vindo, <strong>${cliente.nome}</strong>!<br>
               Plano: ${plano ? plano.nome : '-'}<br>
               <small>Válido até ${formatDate(cliente.validade)}</small>`,
        timer: 2500,
        showConfirmButton: false,
        background: '#fff'
    });
    
    // Check if expiring soon
    const days = daysUntil(cliente.validade);
    if (days >= 0 && days <= 3) {
        setTimeout(() => {
            Swal.fire({
                icon: 'warning',
                title: '⏰ Plano a Expirar',
                html: `O plano de <strong>${cliente.nome}</strong> expira em <strong>${days} dia${days > 1 ? 's' : ''}</strong>.<br>Considere renovar na receção.`,
                confirmButtonText: 'OK',
                background: '#fff'
            });
        }, 2800);
    }
    
    setTimeout(resetAccessStatus, 3000);
    document.getElementById('access-input').value = '';
}

function resetAccessStatus() {
    const iconEl = document.getElementById('access-status-icon');
    iconEl.className = 'access-icon';
    iconEl.innerHTML = '<i class="fas fa-fingerprint"></i>';
}

// ============================================================
// PLANOS
// ============================================================

function renderPlanos() {
    const grid = document.getElementById('plans-grid');
    const clientes = getClientes();
    
    grid.innerHTML = PLANOS.map(p => {
        const clientCount = clientes.filter(c => c.plano === p.id).length;
        return `
        <div class="plan-card ${p.popular ? 'popular' : ''}">
            <div class="plan-icon" style="background:${p.color}15;color:${p.color}">
                <i class="${p.icon}"></i>
            </div>
            <h3>${p.nome}</h3>
            <div class="plan-price">${p.preco}€ <span>/mês</span></div>
            <p style="font-size:0.8rem;color:var(--gray-400)">${p.descricao}</p>
            <ul class="plan-features">
                ${p.features.map(f => `<li><i class="fas fa-check"></i>${f}</li>`).join('')}
            </ul>
            <div class="plan-clients-count">
                <strong>${clientCount}</strong> cliente${clientCount !== 1 ? 's' : ''} subscrito${clientCount !== 1 ? 's' : ''}
            </div>
        </div>`;
    }).join('');
    
    // Populate dropdowns
    populateAssignDropdowns();
}

function populateAssignDropdowns() {
    const clientSelect = document.getElementById('assign-client-select');
    const planSelect = document.getElementById('assign-plan-select');
    const clientes = getClientes();
    
    clientSelect.innerHTML = '<option value="">Selecionar cliente...</option>';
    clientes.forEach(c => {
        clientSelect.innerHTML += `<option value="${c.id}">${c.nome} (${c.id})</option>`;
    });
    
    planSelect.innerHTML = '<option value="">Selecionar plano...</option>';
    PLANOS.forEach(p => {
        planSelect.innerHTML += `<option value="${p.id}">${p.nome} — ${p.preco}€</option>`;
    });
}

function handleAssignPlan() {
    const clientId = document.getElementById('assign-client-select').value;
    const planId = document.getElementById('assign-plan-select').value;
    
    if (!clientId || !planId) {
        Swal.fire({ icon: 'warning', title: 'Campos em falta', text: 'Selecione um cliente e um plano.', background: '#fff' });
        return;
    }
    
    const clientes = getClientes();
    const index = clientes.findIndex(c => c.id === clientId);
    const plano = getPlanoById(planId);
    
    clientes[index].plano = planId;
    clientes[index].estado = 'ativo';
    clientes[index].validade = getFutureDate(30);
    setClientes(clientes);
    
    Swal.fire({
        icon: 'success',
        title: 'Plano Atribuído!',
        html: `<strong>${clientes[index].nome}</strong> agora tem o plano <strong>${plano.nome}</strong>.`,
        timer: 2000,
        showConfirmButton: false,
        background: '#fff'
    });
    
    renderPlanos();
}

// ============================================================
// PLANOS DE TREINO
// ============================================================

function renderPlanosTreino() {
    const grid = document.getElementById('treino-plans-grid');
    const planosClientes = getPlanosClienteTreino();

    grid.innerHTML = PLANOS_TREINO.map(p => {
        const clientCount = Object.values(planosClientes).filter(arr => arr.includes(p.id)).length;
        return `
        <div class="plan-card">
            <div class="plan-icon" style="background:${p.color}15;color:${p.color}">
                <i class="${p.icon}"></i>
            </div>
            <h3>${p.nome}</h3>
            <p style="font-size:0.8rem;color:var(--gray-400);margin-bottom:0.8rem">${p.descricao}</p>
            <ul class="plan-features">
                ${p.exercicios.map(e => `<li><i class="fas fa-check"></i>${e.nome} <span style="color:var(--gray-300);font-size:0.75rem">${e.series}x${e.reps}</span></li>`).join('')}
            </ul>
            <div class="plan-clients-count">
                <strong>${clientCount}</strong> cliente${clientCount !== 1 ? 's' : ''} com este plano
            </div>
            <button class="btn btn-secondary btn-sm" style="width:100%;margin-top:0.8rem;justify-content:center" onclick="openPlanoTreinoModal('${p.id}')">
                <i class="fas fa-eye"></i> Ver Exercícios
            </button>
        </div>`;
    }).join('');

    populateTreinoAssignDropdowns();
    renderClientTreinoPlans();
}

function openPlanoTreinoModal(planoId) {
    const plano = getPlanoTreinoById(planoId);
    if (!plano) return;

    document.getElementById('modal-treino-title').innerHTML =
        `<span style="color:${plano.color}"><i class="${plano.icon}"></i></span> ${plano.nome}`;

    document.getElementById('modal-treino-body').innerHTML = `
        <p style="font-size:0.85rem;color:var(--gray-400);margin-bottom:1.2rem">${plano.descricao}</p>
        <div class="table-container">
            <table class="treino-exercises-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Exercício</th>
                        <th>Séries</th>
                        <th>Reps</th>
                        <th>Descanso</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    ${plano.exercicios.map((e, i) => `
                    <tr>
                        <td style="color:var(--gray-300);font-weight:700">${i + 1}</td>
                        <td><strong>${e.nome}</strong></td>
                        <td><span class="treino-badge">${e.series}</span></td>
                        <td><span class="treino-badge">${e.reps}</span></td>
                        <td style="color:var(--gray-500)">${e.descanso}</td>
                        <td style="font-size:0.78rem;color:var(--gray-400)">${e.notas}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>`;

    document.getElementById('modal-treino-plan').classList.remove('hidden');
}

function populateTreinoAssignDropdowns() {
    const clientSelect = document.getElementById('assign-treino-client-select');
    const planSelect = document.getElementById('assign-treino-plan-select');
    const clientes = getClientes();

    clientSelect.innerHTML = '<option value="">Selecionar cliente...</option>';
    clientes.forEach(c => {
        clientSelect.innerHTML += `<option value="${c.id}">${c.nome} (${c.id})</option>`;
    });

    planSelect.innerHTML = '<option value="">Selecionar plano...</option>';
    PLANOS_TREINO.forEach(p => {
        planSelect.innerHTML += `<option value="${p.id}">${p.nome}</option>`;
    });
}

function handleAssignPlanoTreino() {
    const clientId = document.getElementById('assign-treino-client-select').value;
    const planId = document.getElementById('assign-treino-plan-select').value;

    if (!clientId || !planId) {
        Swal.fire({ icon: 'warning', title: 'Campos em falta', text: 'Selecione um cliente e um plano de treino.', background: '#fff' });
        return;
    }

    const planosClientes = getPlanosClienteTreino();
    if (!planosClientes[clientId]) planosClientes[clientId] = [];

    if (planosClientes[clientId].includes(planId)) {
        Swal.fire({ icon: 'info', title: 'Já atribuído', text: 'Este cliente já tem este plano de treino.', background: '#fff' });
        return;
    }

    planosClientes[clientId].push(planId);
    setPlanosClienteTreino(planosClientes);

    const cliente = getClienteById(clientId);
    const plano = getPlanoTreinoById(planId);

    Swal.fire({
        icon: 'success',
        title: 'Plano Atribuído!',
        html: `<strong>${cliente.nome}</strong> recebeu o plano de treino <strong>${plano.nome}</strong>.`,
        timer: 2000,
        showConfirmButton: false,
        background: '#fff'
    });

    renderPlanosTreino();
}

function removeClienteTreino(clienteId, planoId) {
    const planosClientes = getPlanosClienteTreino();
    if (planosClientes[clienteId]) {
        planosClientes[clienteId] = planosClientes[clienteId].filter(id => id !== planoId);
        if (planosClientes[clienteId].length === 0) delete planosClientes[clienteId];
        setPlanosClienteTreino(planosClientes);
        renderClientTreinoPlans();
        renderPlanosTreino();
    }
}

function renderClientTreinoPlans() {
    const container = document.getElementById('client-treino-plans-list');
    const planosClientes = getPlanosClienteTreino();
    const clientes = getClientes();

    const entries = Object.entries(planosClientes).filter(([, arr]) => arr.length > 0);

    if (entries.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-clipboard-list"></i><p>Nenhum plano de treino atribuído ainda</p></div>';
        return;
    }

    container.innerHTML = entries.map(([clienteId, planoIds]) => {
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) return '';
        return `
        <div class="client-treino-item">
            <div>
                <div style="font-weight:600;font-size:0.9rem;color:var(--gray-700)">${cliente.nome}</div>
                <div style="font-size:0.75rem;color:var(--gray-400)">${cliente.id}</div>
                <div class="client-treino-plans">
                    ${planoIds.map(pid => {
                        const p = getPlanoTreinoById(pid);
                        if (!p) return '';
                        return `<span class="treino-tag" style="background:${p.color}15;color:${p.color}">
                            <i class="${p.icon}"></i> ${p.nome}
                            <button class="treino-tag-remove" onclick="removeClienteTreino('${clienteId}','${pid}')" title="Remover">&times;</button>
                        </span>`;
                    }).join('')}
                </div>
            </div>
        </div>`;
    }).join('');
}

// ============================================================
// VENDAS / RECEITA
// ============================================================

function renderVendas() {
    const pagamentos = getPagamentos();
    const now = new Date();
    
    const receitaTotal = pagamentos.reduce((sum, p) => sum + p.valor, 0);
    const receitaMes = pagamentos
        .filter(p => {
            const d = new Date(p.data);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        .reduce((sum, p) => sum + p.valor, 0);
    
    document.getElementById('revenue-total').textContent = receitaTotal + '€';
    document.getElementById('revenue-month').textContent = receitaMes + '€';
    document.getElementById('revenue-payments').textContent = pagamentos.length;
    
    const tbody = document.getElementById('tbody-pagamentos');
    
    if (pagamentos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><i class="fas fa-receipt"></i><p>Sem pagamentos registados</p></div></td></tr>';
        return;
    }
    
    const sorted = [...pagamentos].sort((a, b) => new Date(b.data) - new Date(a.data));
    
    tbody.innerHTML = sorted.map(p => {
        const cliente = getClienteById(p.clienteId);
        const plano = getPlanoById(p.plano);
        const metodoIcons = {
            multibanco: '<i class="fas fa-university"></i>',
            mbway: '<i class="fas fa-mobile-alt"></i>',
            dinheiro: '<i class="fas fa-money-bill-wave"></i>',
            transferencia: '<i class="fas fa-exchange-alt"></i>'
        };
        return `
        <tr>
            <td>${formatDate(p.data)}</td>
            <td>${cliente ? cliente.nome : p.clienteId}</td>
            <td>${plano ? plano.nome : '-'}</td>
            <td><strong>${p.valor}€</strong></td>
            <td>${metodoIcons[p.metodo] || ''} ${capitalize(p.metodo)}</td>
        </tr>`;
    }).join('');
}

function openPagamentoModal() {
    const modal = document.getElementById('modal-pagamento');
    const form = document.getElementById('form-pagamento');
    form.reset();
    
    // Populate dropdowns
    const clientSelect = document.getElementById('pag-cliente');
    const planSelect = document.getElementById('pag-plano');
    const clientes = getClientes();
    
    clientSelect.innerHTML = '<option value="">Selecionar cliente...</option>';
    clientes.forEach(c => {
        clientSelect.innerHTML += `<option value="${c.id}">${c.nome} (${c.id})</option>`;
    });
    
    planSelect.innerHTML = '<option value="">Selecionar plano...</option>';
    PLANOS.forEach(p => {
        planSelect.innerHTML += `<option value="${p.id}">${p.nome} — ${p.preco}€</option>`;
    });
    
    document.getElementById('pag-valor').value = '';
    
    modal.classList.remove('hidden');
}

function closePagamentoModal() {
    document.getElementById('modal-pagamento').classList.add('hidden');
}

function updatePaymentValue() {
    const planId = document.getElementById('pag-plano').value;
    const plano = getPlanoById(planId);
    document.getElementById('pag-valor').value = plano ? plano.preco + '€' : '';
}

function handleRegistarPagamento(e) {
    e.preventDefault();
    
    const clienteId = document.getElementById('pag-cliente').value;
    const planoId = document.getElementById('pag-plano').value;
    const metodo = document.getElementById('pag-metodo').value;
    
    if (!clienteId || !planoId) {
        Swal.fire({ icon: 'warning', title: 'Campos em falta', text: 'Selecione um cliente e um plano.', background: '#fff' });
        return;
    }
    
    const plano = getPlanoById(planoId);
    const cliente = getClienteById(clienteId);
    
    // Register payment
    const pagamentos = getPagamentos();
    pagamentos.unshift({
        id: generateId('P'),
        clienteId: clienteId,
        data: new Date().toISOString().split('T')[0],
        plano: planoId,
        valor: plano.preco,
        metodo: metodo
    });
    setPagamentos(pagamentos);
    
    // Update client status
    const clientes = getClientes();
    const index = clientes.findIndex(c => c.id === clienteId);
    if (index !== -1) {
        clientes[index].estado = 'ativo';
        clientes[index].plano = planoId;
        clientes[index].validade = getFutureDate(30);
        setClientes(clientes);
    }
    
    closePagamentoModal();
    renderVendas();
    
    Swal.fire({
        icon: 'success',
        title: '💳 Pagamento Registado!',
        html: `<strong>${cliente.nome}</strong><br>
               Plano: ${plano.nome} — <strong>${plano.preco}€</strong><br>
               Método: ${capitalize(metodo)}<br>
               <small>O estado do cliente foi atualizado para ativo.</small>`,
        timer: 3000,
        showConfirmButton: false,
        background: '#fff'
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================
// HISTÓRICO
// ============================================================

function renderHistorico(filter = 'hoje') {
    const historico = getHistorico();
    const tbody = document.getElementById('tbody-historico');
    
    let filtered;
    switch (filter) {
        case 'hoje':
            filtered = historico.filter(h => isToday(h.data));
            break;
        case '7dias':
            filtered = historico.filter(h => isWithinDays(h.data, 7));
            break;
        default:
            filtered = historico;
    }
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state"><i class="fas fa-history"></i><p>Sem registos para este período</p></div></td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map(h => `
        <tr>
            <td>${formatDateTime(h.data)}</td>
            <td>${h.clienteNome}</td>
            <td><strong>${h.clienteId}</strong></td>
            <td><span class="status-badge ${h.status}">${h.status}</span></td>
        </tr>
    `).join('');
}
