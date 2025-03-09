# 📌 Roles en el Club de Motos  

Este archivo documenta los diferentes roles dentro del club de motos y sus permisos asociados.  

## 🔥 Lista de Roles  

- **`ADMIN_ROLE`**              → Acceso total a todas las zonas y configuraciones.  
- **`SUPER_USER_ROLE`**         → Acceso avanzado, pero sin permisos administrativos completos.  
- **`OWNER_ROLE`**              → Dueño o fundador del club, con todos los permisos.  
- **`PRESIDENT_ROLE`**          → Responsable de la dirección del club, permisos administrativos.  
- **`VICE_PRESIDENT_ROLE`**     → Apoyo al presidente, con permisos similares.  
- **`ROAD_CAPTAIN_ROLE`**       → Organiza rutas y eventos de conducción.  
- **`TREASURER_ROLE`**          → Maneja las finanzas del club.  
- **`SECRETARY_ROLE`**          → Administra documentos y registros.  
- **`SERGEANT_AT_ARMS_ROLE`**   → Encargado de seguridad y cumplimiento de reglas.  
- **`MEMBER_ROLE`**             → Miembro regular con acceso limitado.  
- **`PROSPECT_ROLE`**           → Aspirante a miembro, con permisos restringidos.  
- **`GUEST_ROLE`**              → Invitado, acceso solo a áreas públicas.  
- **`EVENT_MANAGER_ROLE`**      → Organiza eventos y gestiona inscripciones.  
- **`MECHANIC_ROLE`**           → Acceso a zonas de mantenimiento y reparación.  
- **`MODERATOR_ROLE`**          → Modera foros o grupos internos del club.  

## 🛠️ Permisos Asociados  

| Permiso            | Roles Autorizados |
|--------------------|------------------|
| **Ver Zonas**     | MEMBER_ROLE, ADMIN_ROLE, SUPER_USER_ROLE |
| **Editar Zonas**  | ADMIN_ROLE, PRESIDENT_ROLE |
| **Gestionar Miembros** | ADMIN_ROLE, PRESIDENT_ROLE, VICE_PRESIDENT_ROLE |
| **Organizar Eventos** | EVENT_MANAGER_ROLE, ADMIN_ROLE |

## 📌 Notas  