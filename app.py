from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# API endpoints for dynamic data (replace with database later)
@app.route('/api/portfolio')
def api_portfolio():
    # Temporary hardcoded data - replace with DB query
    return jsonify([
        {
            "title": "AI Task Manager",
            "description": "Smart to-do app with priority prediction",
            "tech_stack": "Python, Flask, JS"
        },
        {
            "title": "Local Business Directory",
            "description": "Map-based discovery for small shops",
            "tech_stack": "HTML, CSS, JS"
        }
    ])

@app.route('/api/envisioned')
def api_envisioned():
    return jsonify([
        {
            "title": "Freelance Matchmaker",
            "idea_summary": "AI that pairs devs with ideal clients",
            "status": "Validating"
        },
        {
            "title": "No-Code Analytics",
            "idea_summary": "Drag-drop dashboards for non-techies",
            "status": "Mockup ready"
        }
    ])

if __name__ == '__main__':
    app.run(debug=True)