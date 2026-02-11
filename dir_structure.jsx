import { useState } from "react";

const structure = [
  {
    name: "anomaly-surveillance/", type: "root", notes: "Raiz do projeto",
    children: [
      {
        name: ".github/", type: "config", notes: "CI/CD e templates",
        children: [
          { name: "ISSUE_TEMPLATE/", type: "folder" },
          { name: "PULL_REQUEST_TEMPLATE.md", type: "file" },
        ]
      },
      {
        name: "docs/", type: "docs", notes: "Documentação técnica e metodológica",
        children: [
          { name: "architecture/", type: "folder", notes: "Diagramas de arquitetura" },
          { name: "methodology/", type: "folder", notes: "Documentação dos modelos" },
          { name: "pops/", type: "folder", notes: "Procedimentos Operacionais Padronizados" },
          { name: "api/", type: "folder", notes: "Documentação de endpoints" },
          { name: "decisions/", type: "folder", notes: "Registro de decisões técnicas (ADRs)" },
        ]
      },
      {
        name: "infra/", type: "infra", notes: "Infraestrutura e deploy",
        children: [
          {
            name: "docker/", type: "folder", notes: "Dockerfiles por serviço",
            children: [
              { name: "pipeline/", type: "folder" },
              { name: "api/", type: "folder" },
              { name: "frontend/", type: "folder" },
              { name: "airflow/", type: "folder" },
            ]
          },
          { name: "docker-compose.dev.yml", type: "file", notes: "Ambiente de desenvolvimento" },
          { name: "docker-compose.homolog.yml", type: "file", notes: "Ambiente de homologação" },
          { name: "docker-compose.prod.yml", type: "file", notes: "Ambiente de produção" },
          {
            name: "db/", type: "folder", notes: "Scripts de banco de dados",
            children: [
              { name: "migrations/", type: "folder", notes: "Migrações versionadas" },
              { name: "seeds/", type: "folder", notes: "Dados iniciais" },
              { name: "schema.sql", type: "file" },
            ]
          },
        ]
      },
      {
        name: "pipeline/", type: "pipeline", notes: "Pipeline de dados (Python)",
        children: [
          {
            name: "ingestion/", type: "folder", notes: "Camada de ingestão — GAL",
            children: [
              { name: "gal_extractor.py", type: "file", notes: "Extração batch do GAL" },
              { name: "raw_storage.py", type: "file", notes: "Armazenamento de dados brutos" },
              { name: "metadata_logger.py", type: "file", notes: "Registro de execuções" },
            ]
          },
          {
            name: "processing/", type: "folder", notes: "Validação, limpeza e agregação",
            children: [
              { name: "validators.py", type: "file", notes: "Regras de validação" },
              { name: "cleaners.py", type: "file", notes: "Limpeza e deduplicação" },
              { name: "aggregators.py", type: "file", notes: "Agregação semanal por UF/capital/faixa" },
              { name: "series_builder.py", type: "file", notes: "Construção das séries temporais" },
            ]
          },
          {
            name: "feature_engineering/", type: "folder", notes: "Transformações para modelagem",
            children: [
              { name: "temporal_features.py", type: "file", notes: "Tendência, sazonalidade, lags" },
              { name: "normalizers.py", type: "file", notes: "Normalizações e padronizações" },
              { name: "indicators.py", type: "file", notes: "Indicadores auxiliares" },
            ]
          },
          {
            name: "dags/", type: "folder", notes: "DAGs do Apache Airflow",
            children: [
              { name: "dag_weekly_pipeline.py", type: "file", notes: "Pipeline semanal completo" },
              { name: "dag_reprocessing.py", type: "file", notes: "Reprocessamento controlado" },
              { name: "dag_model_retrain.py", type: "file", notes: "Retreinamento de modelos" },
            ]
          },
          {
            name: "utils/", type: "folder",
            children: [
              { name: "db_connector.py", type: "file" },
              { name: "logging_config.py", type: "file" },
              { name: "config.py", type: "file" },
            ]
          },
          {
            name: "tests/", type: "folder", notes: "Testes do pipeline",
            children: [
              { name: "unit/", type: "folder" },
              { name: "integration/", type: "folder" },
              { name: "fixtures/", type: "folder", notes: "Datasets de teste" },
            ]
          },
        ]
      },
      {
        name: "modeling/", type: "modeling", notes: "Modelos estatísticos e ML",
        children: [
          {
            name: "statistical/", type: "folder", notes: "Modelos estatísticos",
            children: [
              { name: "ewma.py", type: "file", notes: "EWMA — Média Móvel Exp. Ponderada" },
              { name: "ewma_calibrator.py", type: "file", notes: "Calibração de parâmetros" },
            ]
          },
          {
            name: "ml/", type: "folder", notes: "Modelos de machine learning",
            children: [
              { name: "isolation_forest.py", type: "file" },
              { name: "dbscan.py", type: "file" },
              { name: "one_class_svm.py", type: "file" },
              { name: "kmeans.py", type: "file" },
              { name: "base_model.py", type: "file", notes: "Interface base para todos os modelos" },
            ]
          },
          {
            name: "ensemble/", type: "folder", notes: "Integração e combinação de modelos",
            children: [
              { name: "signal_combiner.py", type: "file", notes: "Regras de combinação de sinais" },
              { name: "scorer.py", type: "file", notes: "Normalização de escores" },
              { name: "alert_classifier.py", type: "file", notes: "Classificação e priorização" },
            ]
          },
          {
            name: "training/", type: "folder", notes: "Treinamento e validação",
            children: [
              { name: "trainer.py", type: "file" },
              { name: "rolling_validator.py", type: "file", notes: "Validação rolling window" },
              { name: "metrics.py", type: "file", notes: "Métricas de avaliação" },
              { name: "experiment_tracker.py", type: "file", notes: "Rastreamento de experimentos" },
            ]
          },
          {
            name: "registry/", type: "folder", notes: "Versionamento de modelos",
            children: [
              { name: "model_registry.py", type: "file" },
              { name: "artifacts/", type: "folder", notes: "Modelos serializados (.pkl, .joblib)" },
              { name: "metadata/", type: "folder", notes: "Parâmetros e versões" },
            ]
          },
          {
            name: "notebooks/", type: "folder", notes: "Análise exploratória e experimentos",
            children: [
              { name: "exploratory/", type: "folder" },
              { name: "experiments/", type: "folder" },
            ]
          },
          {
            name: "tests/", type: "folder",
            children: [
              { name: "unit/", type: "folder" },
              { name: "functional/", type: "folder" },
            ]
          },
        ]
      },
      {
        name: "api/", type: "api", notes: "Backend — serviço de acesso aos resultados",
        children: [
          {
            name: "app/", type: "folder",
            children: [
              { name: "main.py", type: "file", notes: "Entrypoint da aplicação" },
              { name: "routers/", type: "folder", notes: "Endpoints REST" },
              { name: "schemas/", type: "folder", notes: "Modelos Pydantic" },
              { name: "services/", type: "folder", notes: "Lógica de negócio" },
              { name: "repositories/", type: "folder", notes: "Acesso ao banco de dados" },
              { name: "middleware/", type: "folder", notes: "Autenticação e segurança" },
            ]
          },
          {
            name: "tests/", type: "folder",
            children: [
              { name: "unit/", type: "folder" },
              { name: "integration/", type: "folder" },
            ]
          },
          { name: "requirements.txt", type: "file" },
        ]
      },
      {
        name: "frontend/", type: "frontend", notes: "Painel público — HTML/CSS/JS",
        children: [
          {
            name: "src/", type: "folder",
            children: [
              { name: "index.html", type: "file" },
              {
                name: "js/", type: "folder",
                children: [
                  { name: "charts.js", type: "file", notes: "Gráficos interativos" },
                  { name: "filters.js", type: "file", notes: "Filtros UF/capital/faixa etária" },
                  { name: "alerts.js", type: "file", notes: "Visualização de alertas" },
                  { name: "api_client.js", type: "file", notes: "Consumo da API" },
                ]
              },
              {
                name: "css/", type: "folder",
                children: [
                  { name: "main.css", type: "file" },
                  { name: "components.css", type: "file" },
                ]
              },
              { name: "assets/", type: "folder" },
            ]
          },
          { name: "tests/", type: "folder" },
        ]
      },
      {
        name: "monitoring/", type: "monitoring", notes: "Observabilidade e monitoramento",
        children: [
          { name: "dashboards/", type: "folder", notes: "Configurações de dashboards" },
          { name: "alerts_config/", type: "folder", notes: "Regras de alertas operacionais" },
          { name: "log_config/", type: "folder", notes: "Configurações de logging" },
          { name: "health_checks/", type: "folder", notes: "Scripts de verificação de saúde" },
        ]
      },
      {
        name: "scripts/", type: "scripts", notes: "Scripts operacionais",
        children: [
          { name: "deploy/", type: "folder", notes: "Scripts de deploy por ambiente" },
          { name: "backup/", type: "folder", notes: "Scripts de backup e restauração" },
          { name: "maintenance/", type: "folder", notes: "Manutenção preventiva" },
          { name: "data_quality/", type: "folder", notes: "Verificações de qualidade" },
        ]
      },
      { name: ".env.example", type: "file", notes: "Variáveis de ambiente (template)" },
      { name: ".gitignore", type: "file" },
      { name: "CHANGELOG.md", type: "file", notes: "Histórico de versões" },
      { name: "README.md", type: "file", notes: "Documentação principal" },
      { name: "SECURITY.md", type: "file", notes: "Política de segurança" },
    ]
  }
];

const typeColors = {
  root:      { bg: "#1F4E79", text: "#ffffff", label: "RAIZ" },
  config:    { bg: "#4A4A4A", text: "#ffffff", label: "CONFIG" },
  docs:      { bg: "#7B3F00", text: "#ffffff", label: "DOCS" },
  infra:     { bg: "#1a7a4a", text: "#ffffff", label: "INFRA" },
  pipeline:  { bg: "#6B21A8", text: "#ffffff", label: "PIPELINE" },
  modeling:  { bg: "#B45309", text: "#ffffff", label: "MODELING" },
  api:       { bg: "#0369A1", text: "#ffffff", label: "API" },
  frontend:  { bg: "#0F766E", text: "#ffffff", label: "FRONTEND" },
  monitoring:{ bg: "#9F1239", text: "#ffffff", label: "MONITOR" },
  scripts:   { bg: "#374151", text: "#ffffff", label: "SCRIPTS" },
  folder:    { bg: "#E5E7EB", text: "#374151", label: null },
  file:      { bg: "transparent", text: "#374151", label: null },
};

const layerDescriptions = {
  "docs/":       "Documentação",
  "infra/":      "Infraestrutura",
  "pipeline/":   "Pipeline de Dados",
  "modeling/":   "Modelagem",
  "api/":        "Backend / API",
  "frontend/":   "Frontend",
  "monitoring/": "Monitoramento",
  "scripts/":    "Scripts Operacionais",
};

function FileIcon({ type }) {
  if (type === "file") {
    return (
      <svg className="inline-block mr-1.5" width="13" height="14" viewBox="0 0 13 14" fill="none">
        <path d="M2 1h6l3 3v9H2V1z" stroke="#94A3B8" strokeWidth="1.2" fill="#F8FAFC"/>
        <path d="M8 1v3h3" stroke="#94A3B8" strokeWidth="1.2" fill="none"/>
      </svg>
    );
  }
  return (
    <svg className="inline-block mr-1.5" width="15" height="13" viewBox="0 0 15 13" fill="none">
      <path d="M1 3h5l1.5 2H14v7H1V3z" stroke="#60A5FA" strokeWidth="1.2" fill="#EFF6FF"/>
    </svg>
  );
}

function TreeNode({ node, depth = 0, parentType = null }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const isFile = node.type === "file";
  const color = typeColors[node.type] || typeColors.folder;
  const effectiveType = node.type !== "folder" && node.type !== "file" ? node.type : parentType;

  const accentColor = {
    docs:       "#7B3F00",
    infra:      "#1a7a4a",
    pipeline:   "#6B21A8",
    modeling:   "#B45309",
    api:        "#0369A1",
    frontend:   "#0F766E",
    monitoring: "#9F1239",
    scripts:    "#374151",
    config:     "#4A4A4A",
    root:       "#1F4E79",
  }[effectiveType] || "#94A3B8";

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 18 }}>
      <div
        className="flex items-start gap-1.5 py-0.5 rounded group cursor-pointer select-none"
        style={{ minHeight: 26 }}
        onClick={() => hasChildren && setOpen(o => !o)}
      >
        {/* Indent line */}
        {depth > 0 && (
          <div className="flex-shrink-0 flex items-stretch" style={{ width: 12 }}>
            <div style={{ width: 1, background: `${accentColor}33`, marginLeft: 5, marginTop: 2 }} />
          </div>
        )}

        {/* Toggle arrow */}
        <div className="flex-shrink-0 w-4 flex items-center justify-center mt-0.5">
          {hasChildren ? (
            <svg width="8" height="8" viewBox="0 0 8 8" style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.15s",
              color: accentColor
            }}>
              <path d="M2 1l4 3-4 3V1z" fill="currentColor"/>
            </svg>
          ) : <span style={{ width: 8 }} />}
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <FileIcon type={node.type === "file" ? "file" : "folder"} />
        </div>

        {/* Name */}
        <span style={{
          fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
          fontSize: 13,
          fontWeight: node.type !== "file" ? 600 : 400,
          color: isFile ? "#475569" : "#1E293B",
        }}>
          {node.name}
        </span>

        {/* Type badge */}
        {color.label && (
          <span style={{
            background: color.bg,
            color: color.text,
            fontSize: 9,
            fontWeight: 700,
            padding: "1px 6px",
            borderRadius: 3,
            marginLeft: 4,
            letterSpacing: "0.05em",
            marginTop: 2,
            flexShrink: 0,
          }}>
            {color.label}
          </span>
        )}

        {/* Notes */}
        {node.notes && (
          <span style={{
            fontSize: 11,
            color: "#94A3B8",
            marginLeft: 6,
            fontStyle: "italic",
            marginTop: 2,
            flexShrink: 0,
          }}>
            — {node.notes}
          </span>
        )}
      </div>

      {hasChildren && open && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} parentType={effectiveType || node.type} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [expandAll, setExpandAll] = useState(false);

  const layers = [
    { key: "docs/",       label: "Documentação",        color: "#7B3F00", icon: "📄", desc: "Técnica, metodológica e operacional" },
    { key: "infra/",      label: "Infraestrutura",       color: "#1a7a4a", icon: "🐳", desc: "Docker, PostgreSQL, Airflow" },
    { key: "pipeline/",   label: "Pipeline de Dados",    color: "#6B21A8", icon: "⚙️", desc: "Ingestão, processamento, feature eng." },
    { key: "modeling/",   label: "Modelagem",            color: "#B45309", icon: "🧠", desc: "EWMA, ML, ensemble, registro" },
    { key: "api/",        label: "Backend / API",        color: "#0369A1", icon: "🔌", desc: "Endpoints REST, autenticação" },
    { key: "frontend/",   label: "Frontend",             color: "#0F766E", icon: "🖥️", desc: "Painel público, gráficos, filtros" },
    { key: "monitoring/", label: "Monitoramento",        color: "#9F1239", icon: "📊", desc: "Logs, métricas, alertas operacionais" },
    { key: "scripts/",    label: "Scripts Operacionais", color: "#374151", icon: "🔧", desc: "Deploy, backup, manutenção" },
  ];

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1F4E79 0%, #0369A1 100%)", padding: "28px 32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#93C5FD", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>
            SISTEMA DE DETECÇÃO E PREDIÇÃO DE ANOMALIAS — VIGILÂNCIA EM SAÚDE PÚBLICA
          </div>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}>
            Organização de Diretórios do Projeto
          </h1>
          <p style={{ color: "#BAE6FD", fontSize: 13, margin: "6px 0 0", fontStyle: "italic" }}>
            Arquitetura modular em camadas · Python · R · PostgreSQL · Apache Airflow · Docker
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px" }}>

        {/* Layer overview cards */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", marginBottom: 12 }}>
            CAMADAS DO SISTEMA
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {layers.map(l => (
              <div key={l.key} style={{
                background: "#fff",
                border: `1.5px solid ${l.color}22`,
                borderLeft: `4px solid ${l.color}`,
                borderRadius: 8,
                padding: "10px 12px",
              }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>{l.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: l.color }}>{l.label}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tree panel */}
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{
            background: "#1E293B", padding: "10px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#EF4444" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#F59E0B" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ color: "#94A3B8", fontSize: 12, marginLeft: 10, fontFamily: "monospace" }}>
                anomaly-surveillance/
              </span>
            </div>
            <span style={{ color: "#64748B", fontSize: 11 }}>clique nas pastas para expandir/recolher</span>
          </div>

          <div style={{ padding: "16px 20px", overflowX: "auto" }}>
            {structure.map((node, i) => (
              <TreeNode key={i} node={node} depth={0} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop: 20, background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0", padding: "14px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", marginBottom: 10 }}>
            CONVENÇÕES E PADRÕES
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, fontSize: 12, color: "#475569" }}>
            <div>
              <div style={{ fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>🔵 Linguagens</div>
              <div>Python — pipeline, modelagem, API</div>
              <div>R — análises exploratórias, estatísticas</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>🟢 Versionamento</div>
              <div>Git + versionamento semântico</div>
              <div>CHANGELOG.md para releases</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>🔴 Ambientes</div>
              <div>docker-compose.dev / homolog / prod</div>
              <div>.env.example sem valores sensíveis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
