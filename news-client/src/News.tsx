import { useState, useEffect } from 'react';

interface TopicDTO {
  id?: number | null;
  title?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

const News = () => {
  const [topics, setTopics] = useState<TopicDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [formData, setFormData] = useState<Omit<TopicDTO, 'id' | 'createdAt' | 'updatedAt'>>({ 
    title: '' 
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTopics = async () => {
    try {
      const response = await fetch(`/api/topic`, { method: "GET" });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data: TopicDTO[] = await response.json();
      setTopics(data);
      setLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const topicToSave: TopicDTO = {
      id: editingId || undefined,
      title: formData.title
    };

    try {
      const response = await fetch('/api/topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([topicToSave])
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save topic');
      }
      
      resetForm();
      await fetchTopics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Saving failed');
    }
  };

  const handleDelete = async (ids: number[]) => {
    try {
      const response = await fetch('/api/topic', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ids)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete topics');
      }
      
      setSelectedIds([]);
      await fetchTopics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deletion failed');
    }
  };

  const resetForm = () => {
    setFormData({ title: '' });
    setEditingId(null);
  };

  const setupEdit = (topic: TopicDTO) => {
    if (topic.id === undefined || topic.id === null) return;
    
    setFormData({
      title: topic.title || ''
    });
    setEditingId(topic.id);
  };

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div>Loading topics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Topics Management</h1>

      {/* Форма создания/редактирования */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Topic' : 'Add Topic'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Список топиков с функциями */}
      <div className="mb-3">
        <button
          className="btn btn-danger"
          disabled={selectedIds.length === 0}
          onClick={() => handleDelete(selectedIds)}
        >
          Delete Selected
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map(topic => (
            <tr key={topic.id || 'new'}>
              <td>
                {topic.id && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(topic.id)}
                    onChange={() => topic.id && toggleSelection(topic.id)}
                  />
                )}
              </td>
              <td>{topic.id || 'N/A'}</td>
              <td>{topic.title || 'Untitled'}</td>
              <td>{formatDate(topic.createdAt)}</td>
              <td>{formatDate(topic.updatedAt)}</td>
              <td>
                <div className="d-flex gap-1">
                  {topic.id && (
                    <>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setupEdit(topic)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => topic.id && handleDelete([topic.id])}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default News;