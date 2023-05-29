import './style/done.css';

function Done({tasks, removeTask}) {

      return (
        <div className="container">
                <div className='header'><h3>DONE</h3></div>
                {tasks
            .filter(task => task.status === 'DONE')
            .map(task => (
              <div key={task.id} className="task" >
                <h4>{task.title}</h4>
                <div>
                  <button onClick={() => removeTask(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={30}  stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      );
    }
    
  
  export default Done;
  