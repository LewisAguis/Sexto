    <div>
    <blockquote class="blockquote text-center">
      <p class='mb-0'>$titulo</p>";
      <footer class='blockquote-footer'> por $autor <cite title='$titulo'>el $fecha</cite></footer>";
    </blockquote>
    <img src='$dir' class='img-fluid rounded' alt='$imagen'/>
    <div class='card-body'><p class='card-text'>$nota</p></div>
            
    </div>
  
    <form  action="<?php echo $_SERVER['PHP_SELF']."?Id=$Id"; ?>" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="Id" value="<?php echo $Id; ?>">
		<button type="submit" class="btn btn-primary" name="Like" value="1">Like<span class="badge"><?php echo $like; ?></button>
  </form>
  <!-- /#wrapper -->
  
    <?php 
        require_once "Conectar.php";
        $db = conectaDB();
        
        function consultaComents($cons,$id){
            $datos;        
            $consulta = "SELECT * FROM `COMENTARIOS` WHERE IdN=$id ORDER by IdC DESC";
            $result = $cons->query($consulta);
            if (!$result) {
                print "    <p>Error en la consulta.</p>\n";
            } else {
                foreach ($result as $valor) {
                    $datos[]=$valor;
                }
            }
            return $datos;    
        }
        
        $coments=ConsultaComents($db,$Id);
        
    
    ?>
    <ul class="list-group">
        <?php
        foreach ($coments as $valor) {
                print "<li class='list-group-item active'>".$valor["Comentario"]."</li>";

                }
        ?>
    </ul>
    
    
   <form  action="<?php echo $_SERVER['PHP_SELF']."?Id=$Id"; ?>" method="POST" enctype="multipart/form-data">
			<div class="form-group">
				<label for="exampleInputEmail1">Comentario:</label>
				<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escriba aqui su comentario" name="Comentario">
			    <input type="hidden" name="Id" value="<?php echo $Id; ?>">
			</div>
			<button type="submit" class="btn btn-primary">Comentar</button>
	</form>

  <!-- Bootstrap core JavaScript -->
  <script src="Noticias/js/jquery.min.js"></script>
  <script src="Noticias/js/bootstrap.bundle.min.js"></script>

  <!-- Menu Toggle Script -->
  <script>
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  </script>

</body>

</html>