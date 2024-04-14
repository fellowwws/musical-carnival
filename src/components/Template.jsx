export default function Template(props) {
    return (
        <div 
        className="d-flex flex-column rounded" 
        style={{
            width: 800, 
            height: 600,
            border: '10px solid #6f42c1'
        }}>
            <div 
            className="text-center text-light" 
            style={{
                fontSize: 80,
                fontWeight: 'bold',
                lineHeight: 1.5,
                backgroundColor: '#6f42c1', 
                borderBottom: '10px solid #6f42c1'
            }}>
                {props.label}
            </div>
            <div className="d-flex align-items-center justify-content-center h-100">
                {props.children}
            </div>
        </div>
    )
}