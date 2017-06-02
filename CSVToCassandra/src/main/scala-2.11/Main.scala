/**
  * Basic object that converts a CSV file to an Apache Spark dataframe, reduces
  * and then inserts it into Cassandra
  */

object Main {

  def main(args: Array[String]) {

    // Initialise Spark
    val spark = org.apache.spark.sql.SparkSession.builder
      .master("local")
      .appName("CSVToCassandra")
      .getOrCreate

    // Read the CSV file into a dataframe
    val df = spark.read
      .format("csv")
      .option("header", "true")
      .option("mode", "DROPMALFORMED")
      .csv("data/SalesJan2009.csv")

    // Reduce the dataframe based on the parameters
    val conds = List(df("Payment_type").contains("Mastercard"), df("Price") > 1200)
    val filtered = df.filter(conds.reduce(_&&_))

    // Insert into Cassandra
    filtered.write.format("org.apache.spark.sql.cassandra").options(Map( "table" -> "sales_test", "keyspace" -> "test")).save()

    spark.stop()

  }

}
