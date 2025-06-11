using Microsoft.AspNetCore.Mvc;
using NewsAPI.Data;
using NewsAPI.Services;

namespace NewsAPI.Controllers
{
    [Route("api/topic")]
    [ApiController]
    public class TopicController(TopicService service):ControllerBase
    {
        private TopicService _service { get; } = service;

        [HttpGet]
        public async Task<ActionResult<TopicDTO>> Get()
        {
            var topic =(await _service.Get(_service._dataContext.Topics, []))
                .Select(x => x.ToDTO())
                .ToList();

            return Ok(topic);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete([FromBody] List<int> ids)
        {
            var result = await _service.Delete(_service._dataContext.Topics, ids);

            if (result)
                return Ok(result);
            else
                return BadRequest("No topics were deleted");
        }

        [HttpPost]
        public async Task<ActionResult> Set([FromBody] List<TopicDTO> topics)
        {
            var result = await _service.Set(
                _service._dataContext.Topics, 
                topics.Select(x=>x.ToEntity()).ToList()
                );

            if (result)
                return Ok(result);
            else
                return BadRequest("No topics were updated");
        }


    }
}
